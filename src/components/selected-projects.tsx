import type { CSSProperties, MouseEvent } from "react";
import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import { useProjectMotion } from "@/hooks/use-project-motion";
import "./selected-projects.css";

type Project = {
  title: string;
  role: string;
  copy: string;
  tags: readonly string[];
  image: string;
  live: string;
  source: string;
};

type SelectedProjectsProps = {
  projects: readonly Project[];
  githubUrl: string;
};

const number = (index: number) => String(index + 1).padStart(2, "0");

export function SelectedProjects({ projects, githubUrl }: SelectedProjectsProps) {
  const { sectionRef, activeIndex, jumpToProject } = useProjectMotion(projects.length);

  const navigate = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    jumpToProject(index);
  };

  return (
    <section
      id="projets"
      ref={sectionRef}
      className="projects-showcase"
      aria-labelledby="projects-heading"
    >
      <div className="projects-intro">
        <div>
          <p className="projects-eyebrow">
            <span aria-hidden="true" /> Projets sélectionnés
          </p>
          <h2 id="projects-heading">
            Des projets.
            <br />
            <em>Du caractère.</em>
          </h2>
        </div>
        <div className="projects-intro-aside">
          <p>
            Quatre univers, une même intention :<br />
            créer une expérience qui reste.
          </p>
          <a
            className="daisy-btn projects-github"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tout mon GitHub <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>

      <nav className="projects-index" aria-label="Explorer les projets">
        {projects.map((project, index) => (
          <a
            key={project.title}
            href={`#projet-${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={(event) => navigate(event, index)}
          >
            <span className="projects-index-number">{number(index)}</span>
            <span>{project.title}</span>
            <ArrowUpRight className="projects-index-arrow" size={15} aria-hidden="true" />
          </a>
        ))}
        <span className="projects-index-track" aria-hidden="true">
          <span />
        </span>
      </nav>

      <ol className="project-stack" data-project-stack>
        {projects.map((project, index) => (
          <li
            id={`projet-${index + 1}`}
            key={project.title}
            className="project-stack-item"
            style={{ "--project-order": index } as CSSProperties}
            data-project-item
          >
            <article
              className="project-panel"
              data-project-panel
              aria-labelledby={`project-title-${index + 1}`}
              onFocusCapture={(event) => {
                // Bring covered cards back into view when navigating their links with Tab.
                if (
                  activeIndex !== index &&
                  event.target instanceof HTMLElement &&
                  event.target.matches(":focus-visible")
                )
                  jumpToProject(index, "instant");
              }}
            >
              <a
                className="project-media"
                data-project-visual
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Découvrir le projet ${project.title} (nouvel onglet)`}
              >
                <img
                  data-project-image
                  className="project-image"
                  src={project.image}
                  alt={`Aperçu de ${project.title}`}
                  width={index === 0 ? 1599 : index === 1 ? 1672 : 1280}
                  height={index === 0 ? 900 : index === 1 ? 941 : 800}
                  loading="lazy"
                  decoding="async"
                />
                <span className="project-media-scrim" aria-hidden="true" />
                <span className="project-media-label" aria-hidden="true">
                  Amani.Dev / Projet {number(index)}
                </span>
                <span className="project-media-number" aria-hidden="true">
                  {number(index)}
                </span>
                <span className="project-explore" aria-hidden="true">
                  <ArrowUpRight size={27} />
                </span>
              </a>

              <div className="project-details" data-project-copy>
                <div className="project-details-top">
                  <p className="project-category">{project.role}</p>
                  <span className="project-fraction" aria-hidden="true">
                    {number(index)} / {String(projects.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 id={`project-title-${index + 1}`}>{project.title}</h3>
                <p className="project-description">{project.copy}</p>
                <ul className="project-tags" aria-label="Technologies et fonctionnalités">
                  {project.tags.map((tag) => (
                    <li key={tag} className="daisy-badge project-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="project-actions">
                  <a
                    className="daisy-btn project-primary"
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Découvrir le projet <ArrowUpRight size={18} aria-hidden="true" />
                    <span className="sr-only"> {project.title} (nouvel onglet)</span>
                  </a>
                  <a
                    className="daisy-btn project-source"
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Code source de ${project.title} sur GitHub (nouvel onglet)`}
                  >
                    <Github size={18} aria-hidden="true" />
                    <span>Code source</span>
                  </a>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>

      <div className="projects-outro">
        <span>
          <span className="projects-outro-dot" aria-hidden="true" /> La suite s’écrit maintenant.
        </span>
        <a className="daisy-btn projects-next" href="#contact">
          Et si le prochain projet était le vôtre ? <ArrowDown size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
