import { useCallback, useEffect, useRef, useState } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const itemSelector = "[data-project-item]";

/** Native scrolling stays in control; React only updates when the active project changes. */
export function useProjectMotion(projectCount: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const jumpToProject = useCallback((index: number, behavior?: ScrollBehavior) => {
    const section = sectionRef.current;
    const stack = section?.querySelector<HTMLOListElement>("[data-project-stack]");
    const items = Array.from(section?.querySelectorAll<HTMLElement>(itemSelector) ?? []);
    const item = items[index];
    if (!stack || !item) return;

    // Sticky boxes no longer report their original position. Reconstruct it from flow sizes.
    const gap = Number.parseFloat(getComputedStyle(stack).rowGap) || 0;
    const offset = items
      .slice(0, index)
      .reduce((total, node) => total + node.offsetHeight + gap, 0);
    const stickyTop = Number.parseFloat(getComputedStyle(item).top) || 88;
    const top = stack.getBoundingClientRect().top + window.scrollY + offset - stickyTop;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({ top, behavior: reducedMotion ? "instant" : (behavior ?? "smooth") });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || projectCount === 0) return;

    const items = Array.from(section.querySelectorAll<HTMLElement>(itemSelector));
    const panels = items.map((item) => item.querySelector<HTMLElement>("[data-project-panel]"));
    const images = items.map((item) => item.querySelector<HTMLElement>("[data-project-image]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const spaciousViewport = window.matchMedia("(min-width: 900px) and (min-height: 700px)");
    const animations = new Set<Animation>();
    const revealed = new WeakSet<Element>();
    let frame = 0;
    let inView = false;
    let stacked = false;
    let stickyTops: number[] = [];

    const update = () => {
      frame = 0;
      if (!inView) return;

      // Read geometry together before writing styles to avoid alternating layout reads/writes.
      const rects = items.map((item) => item.getBoundingClientRect());
      const viewport = window.innerHeight;
      const activationLine = stacked ? (stickyTops[0] ?? 136) + 180 : viewport * 0.48;
      let current = 0;

      const values = rects.map((rect, index) => {
        if (rect.top <= activationLine) current = index;
        const next = rects[index + 1];
        const covered =
          stacked && next
            ? clamp(((stickyTops[index] ?? 136) + rect.height - next.top) / rect.height)
            : 0;
        const travel = clamp((viewport - rect.top) / (viewport + rect.height));
        return { covered, imageY: (travel - 0.5) * 28 };
      });

      setActiveIndex((previous) => (previous === current ? previous : current));
      section.style.setProperty("--projects-progress", String((current + 1) / projectCount));

      if (!reducedMotion.matches) {
        values.forEach(({ covered, imageY }, index) => {
          panels[index]?.style.setProperty("--stack-depth", covered.toFixed(4));
          images[index]?.style.setProperty("--image-offset", `${imageY.toFixed(2)}px`);
        });
      }
    };

    const schedule = () => {
      if (!frame && inView) frame = window.requestAnimationFrame(update);
    };

    const configure = () => {
      // Only pin cards when their full content fits below the navigation.
      // Measure in normal flow so translated/sticky geometry cannot affect the decision.
      section.dataset.motion = "flow";
      const sectionStyle = getComputedStyle(section);
      const stickyStart =
        Number.parseFloat(sectionStyle.getPropertyValue("--project-sticky-top")) || 136;
      const stackStep =
        Number.parseFloat(sectionStyle.getPropertyValue("--project-stack-step")) || 10;
      const naturalHeight = Math.max(...panels.map((panel) => panel?.offsetHeight ?? 0));
      const panelHeight = Math.max(
        naturalHeight,
        Math.min(640, Math.max(480, window.innerHeight * 0.65)),
      );
      const availableHeight =
        window.innerHeight - stickyStart - (items.length - 1) * stackStep - 24;
      stacked =
        spaciousViewport.matches && !reducedMotion.matches && panelHeight <= availableHeight;
      section.style.setProperty("--project-panel-height", `${Math.ceil(panelHeight)}px`);
      section.dataset.motion = stacked ? "stack" : "flow";
      stickyTops = items.map((item) => Number.parseFloat(getComputedStyle(item).top) || 0);

      if (reducedMotion.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
      panels.forEach((panel) => panel?.style.removeProperty("--stack-depth"));
      images.forEach((image) => image?.style.removeProperty("--image-offset"));
      schedule();
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        section.dataset.inView = String(inView);
        if (inView) schedule();
      },
      { rootMargin: "160px 0px" },
    );

    const reveals = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || revealed.has(entry.target)) return;
          revealed.add(entry.target);
          reveals.unobserve(entry.target);
          if (reducedMotion.matches) return;

          const visual = entry.target.querySelector<HTMLElement>("[data-project-visual]");
          const copy = entry.target.querySelector<HTMLElement>("[data-project-copy]");
          const parts = [visual, copy].filter((part): part is HTMLElement => Boolean(part));

          parts.forEach((part, index) => {
            if (typeof part.animate !== "function") return;
            const keyframes: Keyframe[] =
              index === 0 && spaciousViewport.matches
                ? [
                    { clipPath: "inset(7% 0 7% 0)", opacity: 0.4 },
                    { clipPath: "inset(0)", opacity: 1 },
                  ]
                : [
                    { transform: "translateY(22px)", opacity: 0 },
                    { transform: "translateY(0)", opacity: 1 },
                  ];
            const animation = part.animate(keyframes, {
              duration: index === 0 ? 850 : 650,
              delay: index * 100,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "backwards",
            });
            animations.add(animation);
            animation.finished
              .then(() => animations.delete(animation))
              .catch(() => animations.delete(animation));
          });
        });
      },
      { threshold: 0.16 },
    );

    const resize = new ResizeObserver(configure);
    configure();
    visibility.observe(section);
    items.forEach((item) => {
      reveals.observe(item);
      resize.observe(item);
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", configure, { passive: true });
    reducedMotion.addEventListener("change", configure);
    spaciousViewport.addEventListener("change", configure);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", configure);
      reducedMotion.removeEventListener("change", configure);
      spaciousViewport.removeEventListener("change", configure);
      visibility.disconnect();
      reveals.disconnect();
      resize.disconnect();
      animations.forEach((animation) => animation.cancel());
      panels.forEach((panel) => panel?.style.removeProperty("--stack-depth"));
      images.forEach((image) => image?.style.removeProperty("--image-offset"));
      section.style.removeProperty("--projects-progress");
      section.style.removeProperty("--project-panel-height");
      delete section.dataset.motion;
      delete section.dataset.inView;
    };
  }, [projectCount]);

  return { sectionRef, activeIndex, jumpToProject };
}
