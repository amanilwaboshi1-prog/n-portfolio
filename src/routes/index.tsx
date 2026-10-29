import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ParticlePortrait } from "@/components/particle-portrait";
import { SplitText } from "@/components/split-text";

export const Route = createFileRoute("/")({ component: Home });

const wa = "https://wa.me/243972092957";
const github = "https://github.com/amanilwaboshi1-prog";

const nav = [
  ["Accueil", "#accueil"],
  ["À propos", "#apropos"],
  ["Compétences", "#competences"],
  ["Projets", "#projets"],
  ["Contact", "#contact"],
];

const pillars = [
  {
    title: "Présence web",
    copy: "Des interfaces modernes qui donnent une image professionnelle.",
  },
  {
    title: "Technologies",
    copy: "Développement, automatisation et découverte de l'IA.",
  },
  {
    title: "Approche",
    copy: "Écouter, concevoir, développer et améliorer progressivement.",
  },
  {
    title: "Expérience mobile",
    copy: "Une expérience soignée sur téléphone, tablette et ordinateur.",
  },
];

const skills = [
  {
    title: "Frontend",
    copy: "Création d'interfaces web modernes et responsives.",
    tags: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    title: "Backend",
    copy: "Développement côté serveur et gestion des données.",
    tags: ["Python", "Node.js", "Laravel", "MySQL"],
  },
  {
    title: "IA & automatisation",
    copy: "Exploration de Python, IA et automatisation de tâches.",
    tags: ["Python", "Automation", "IA"],
  },
  {
    title: "Outils",
    copy: "Les outils utilisés pour développer et organiser mes projets.",
    tags: ["Git", "GitHub", "VS Code"],
  },
];

const works = [
  {
    title: "Terra Mining",
    role: "Site vitrine · Industrie minière",
    copy: "Un concept de site vitrine pour une entreprise minière fictive. De l'exploration à la valorisation, avec une identité éditoriale et une expérience soignée sur téléphone comme sur grand écran.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive", "UI"],
    image: "/work-terra.webp",
    live: "/terra/index.html",
    source: "https://github.com/amanilwaboshi1-prog/terra-mining",
  },
  {
    title: "VELORA",
    role: "Expérience automobile · Kolwezi",
    copy: "Un site vitrine de location automobile à Kolwezi, avec une ouverture animée, une interface adaptée au téléphone et à la tablette, et une simulation de location avec estimation du prix.",
    tags: ["HTML", "CSS", "JavaScript", "Animation", "Responsive"],
    image: "/work-velora.webp",
    live: "/velora.html",
    source: "https://github.com/amanilwaboshi1-prog/m-portfolio",
  },
  {
    title: "Orbita",
    role: "Exploration 3D · Éducatif",
    copy: "Explorer les 8 planètes, découvrir leurs secrets et apprendre en jouant.",
    tags: ["3D interactive", "Fiches pédagogiques", "Quiz"],
    image: "/work-orbita.png",
    live: "https://amanilwaboshi1-prog.github.io/orbita/",
    source: "https://github.com/amanilwaboshi1-prog/orbita",
  },
  {
    title: "Green Space",
    role: "Site web associatif",
    copy: "Un site engagé pour protéger les forêts et mobiliser une communauté.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive"],
    image: "/work-greenspace.png",
    live: "https://amanilwaboshi1-prog.github.io/Green-space/",
    source: "https://github.com/amanilwaboshi1-prog/Green-space",
  },
];

function Home() {
  const [ready, setReady] = useState(false);
  const [pct, setPct] = useState(0);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll", max > 0 ? String(window.scrollY / max) : "0");
      const hero = document.getElementById("accueil");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
        hero.style.setProperty("--hero", progress.toFixed(3));
        root.style.setProperty("--hero", progress.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    if (reduce) {
      setPct(100);
      setReady(true);
      document.querySelectorAll(".rise").forEach((node) => node.classList.add("is-in"));
      return;
    }

    let n = 0;
    const id = window.setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 8 + 3));
      setPct(n);
      if (n >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => setReady(true), 260);
      }
    }, 36);

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.16 },
    );
    document.querySelectorAll(".rise").forEach((node) => io.observe(node));

    return () => {
      window.clearInterval(id);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <main>
      <div className="noise" aria-hidden />
      <div className="scroll-line" aria-hidden />
      <div className={ready ? "loader loader-out" : "loader"} aria-hidden={ready}>
        <span>{pct}</span>
      </div>
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between gap-4 px-5 py-4 md:px-10">
        <a href="#accueil" className="text-sm tracking-wide text-paper">
          Amani.Dev
        </a>
        <nav className="hidden items-center gap-5 md:flex">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="text-xs tracking-wide text-mute hover:text-paper">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-xs tracking-wide text-paper sm:inline"
          >
            Me contacter →
          </a>
          <button
            type="button"
            className="text-sm tracking-wide text-paper md:hidden"
            aria-expanded={menu}
            onClick={() => setMenu((open) => !open)}
          >
            {menu ? "Fermer" : "Menu"}
          </button>
        </div>
      </header>
      {menu ? (
        <nav className="menu-panel md:hidden">
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
          <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => setMenu(false)}>
            Me contacter
          </a>
        </nav>
      ) : null}

      <section id="accueil" className="relative h-dvh min-h-[640px] overflow-hidden">
        <ParticlePortrait />
        <div className="hero-copy">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-mute uppercase">Bonjour, je suis</p>
            <SplitText text="Amani Alain" className="hero-name" play={ready} delay={0.15} />
          </div>
          <SplitText
            text="Développeur Web & passionné de technologie"
            className="hero-role"
            play={ready}
            delay={0.45}
          />
        </div>
        <p className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[11px] tracking-[0.35em] text-mute uppercase">
          Disponible
        </p>
      </section>

      <section className="rise border-t border-line px-6 py-20 md:px-16 md:py-28">
        <p className="max-w-3xl text-lg leading-relaxed text-paper md:text-2xl">
          Je transforme une idée, un besoin ou un projet en une expérience web claire, moderne et
          professionnelle. Mon objectif : créer des solutions utiles, crédibles et pensées pour donner
          envie d’aller plus loin.
        </p>
        <div className="mt-8 flex flex-wrap gap-6 text-sm">
          <a href="#projets" className="border-b border-line pb-1 text-paper">
            Découvrir mon travail ↗
          </a>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="border-b border-line pb-1 text-paper">
            Parlons de votre projet
          </a>
        </div>
      </section>

      <section id="apropos" className="rise border-t border-line px-6 py-24 md:px-16 md:py-36">
        <p className="text-[11px] tracking-[0.35em] text-mute uppercase">À propos</p>
        <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[0.95] text-paper md:text-7xl">
          Des idées aux solutions, je construis avec intention.
        </h2>
        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <div className="max-w-xl space-y-5 text-base leading-relaxed text-mute md:col-span-6 md:text-lg">
            <p>
              Je suis <span className="text-paper">Amani Alain</span>, développeur web basé en République
              démocratique du Congo.
            </p>
            <p>
              Je travaille autour du développement logiciel, de l’intelligence artificielle, de
              l’automatisation et de la création de produits numériques. Je cherche surtout à comprendre le
              besoin avant de penser au code.
            </p>
            <p>
              Chaque projet doit être simple à comprendre, agréable à utiliser et adapté à tous les écrans.
              Le but n’est pas seulement de faire joli : c’est de créer une présence web qui peut réellement
              servir votre activité.
            </p>
            <a href="#contact" className="inline-block border-b border-line pb-1 text-paper">
              Travaillons ensemble ↗
            </a>
          </div>
          <ul className="grid gap-8 sm:grid-cols-2 md:col-span-5 md:col-start-8">
            {pillars.map((item) => (
              <li key={item.title}>
                <h3 className="font-serif text-2xl text-paper">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{item.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="competences" className="rise border-t border-line px-6 py-24 md:px-16 md:py-36">
        <p className="text-[11px] tracking-[0.35em] text-mute uppercase">Compétences</p>
        <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[0.95] text-paper md:text-7xl">
          Les compétences au service de vos projets.
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-mute">
          Une base technique que je développe continuellement pour construire des expériences web fiables,
          modernes et adaptées aux besoins réels.
        </p>
        <div className="mt-14 grid gap-12 md:grid-cols-2">
          {skills.map((skill) => (
            <article key={skill.title} className="skill-card border-t border-line pt-6">
              <h3 className="font-serif text-3xl text-paper">{skill.title}</h3>
              <p className="mt-3 text-mute">{skill.copy}</p>
              <p className="mt-4 text-xs tracking-[0.18em] text-paper uppercase">{skill.tags.join("  ·  ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projets" className="rise border-t border-line px-6 py-24 md:px-16 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.35em] text-mute uppercase">Projets</p>
            <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[0.95] text-paper md:text-7xl">
              Des projets concrets, pas seulement des promesses.
            </h2>
          </div>
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-sm text-paper">
            Voir GitHub ↗
          </a>
        </div>
        <div className="works">
          {works.map((work, index) => (
            <article key={work.title} className="work">
              <a className="project-frame work-visual block" href={work.live} target="_blank" rel="noopener noreferrer">
                <img src={work.image} alt={work.title} className="project-shot" />
                <span className="work-index">0{index + 1}</span>
              </a>
              <div className="work-copy md:col-span-4">
                <p className="text-[11px] tracking-[0.28em] text-mute uppercase">{work.role}</p>
                <h3 className="mt-3 font-serif text-4xl text-paper">{work.title}</h3>
                <p className="mt-4 leading-relaxed text-mute">{work.copy}</p>
                <p className="mt-4 text-xs tracking-[0.16em] text-paper uppercase">{work.tags.join("  ·  ")}</p>
                <div className="mt-6 flex gap-5 text-sm">
                  <a href={work.live} target="_blank" rel="noopener noreferrer" className="text-paper">
                    Voir le projet ↗
                  </a>
                  <a href={work.source} target="_blank" rel="noopener noreferrer" className="text-mute">
                    Code source ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-16 text-sm text-mute">D’autres projets arrivent.</p>
      </section>

      <section id="contact" className="rise border-t border-line px-6 py-28 md:px-16 md:py-40">
        <p className="text-[11px] tracking-[0.35em] text-mute uppercase">Contact</p>
        <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[0.95] text-paper md:text-7xl">
          Vous avez une idée ? Construisons-la ensemble.
        </h2>
        <p className="mt-8 max-w-xl leading-relaxed text-mute">
          Vous avez besoin d’un site web, d’une application ou d’une solution numérique ? Décrivez-moi votre
          idée et voyons ensemble comment la transformer en projet concret.
        </p>
        <div className="mt-10 flex flex-wrap gap-8">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="font-serif text-3xl text-paper md:text-5xl">
            WhatsApp
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-3xl text-paper md:text-5xl"
          >
            GitHub
          </a>
        </div>
        <p className="mt-8 text-sm text-mute">République démocratique du Congo · +243 972 092 957</p>
      </section>

      <footer className="flex flex-col gap-2 border-t border-line px-6 py-8 text-xs text-mute md:flex-row md:justify-between md:px-16">
        <span>© 2026 Amani Alain. Tous droits réservés.</span>
        <span>Amani.Dev — basé en RDC. Disponible.</span>
      </footer>
    </main>
  );
}
