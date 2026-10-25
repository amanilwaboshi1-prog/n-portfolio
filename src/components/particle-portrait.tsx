import { useEffect, useRef } from "react";

type Point = [number, number, number];

export function ParticlePortrait() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let points: Point[] = [];
    let sx: Float32Array = new Float32Array(0);
    let sy: Float32Array = new Float32Array(0);
    let stars: { x: number; y: number; s: number; v: number }[] = [];
    let frame = 0;
    let start = 0;
    let dead = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth - 0.5;
      pointer.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
    };

    const draw = (now: number) => {
      if (dead) return;
      frame = requestAnimationFrame(draw);
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#070708";
      ctx.fillRect(0, 0, w, h);

      for (const star of stars) {
        star.y -= star.v;
        if (star.y < 0) star.y += 1;
        ctx.fillStyle = "rgba(243,241,236,0.35)";
        ctx.fillRect(star.x * w, star.y * h, star.s, star.s);
      }

      if (!points.length) return;

      const cssW = canvas.clientWidth;
      if (cssW < 1) return;
      const narrow = cssW < 900;
      const pw = narrow ? w * 0.72 : Math.min(w * 0.36, h * 0.52);
      const ph = pw / 0.8;
      const ox = (w - pw) / 2 + pointer.x * w * 0.02;
      const oy = (narrow ? h * 0.06 : (h - ph) * 0.46) + pointer.y * h * 0.015;
      const t = reduce ? 1 : Math.min(1, (now - start) / 2200);
      const e = 1 - Math.pow(1 - t, 3);
      const dot = Math.max(1.15, w / 780);
      const reach = 150 * (w / cssW);

      ctx.fillStyle = "#f3f1ec";
      const mx = (pointer.x + 0.5) * w;
      const my = (pointer.y + 0.5) * h;
      for (let i = 0; i < points.length; i++) {
        const [tx, ty, lum] = points[i];
        const x = sx[i] + (tx - sx[i]) * e;
        const y = sy[i] + (ty - sy[i]) * e;
        const drift = t >= 1 && !reduce ? Math.sin(now * 0.0011 + i * 0.37) * dot * 0.45 : 0;
        let px = ox + x * pw;
        let py = oy + y * ph + drift;
        const dx = px - mx;
        const dy = py - my;
        const dist = Math.hypot(dx, dy) || 1;
        if (!reduce && dist < reach) {
          const push = (1 - dist / reach) * reach * 0.22;
          px += (dx / dist) * push;
          py += (dy / dist) * push;
        }
        const size = lum < 0.35 ? dot * 1.35 : dot;
        ctx.globalAlpha = lum < 0.45 ? 0.95 : 0.7;
        ctx.fillRect(px, py, size, size);
      }
      ctx.globalAlpha = 1;
    };

    fit();
    const onResize = () => fit();
    window.addEventListener("resize", onResize);

    start = performance.now();
    frame = requestAnimationFrame(draw);

    fetch("/portrait-points.json")
      .then((r) => r.json())
      .then((data: Point[]) => {
        if (dead) return;
        points = data;
        sx = new Float32Array(data.length);
        sy = new Float32Array(data.length);
        for (let i = 0; i < data.length; i++) {
          const ang = Math.random() * Math.PI * 2;
          const rad = 0.55 + Math.random() * 0.9;
          sx[i] = 0.5 + Math.cos(ang) * rad;
          sy[i] = 0.45 + Math.sin(ang) * rad * 0.7;
        }
        start = performance.now();
      })
      .catch(() => {});

    stars = Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: Math.random() < 0.8 ? 1 : 1.6,
      v: 0.00015 + Math.random() * 0.00035,
    }));

    return () => {
      dead = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
