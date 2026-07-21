import { useEffect, useRef } from 'react';
import './Projects.css';

/* ─────────────────────────────────────────────────────────
   SCROLL JOURNEY — Section 2 of 2 (Projects)

   SECTION: Projects (normal scroll, 100vh–200vh)
   ─────────────────────────────────────────────────────────
   scroll_range: 100vh to 200vh (normal document flow, below sticky hero)
   trigger: scroll past hero → clip-path transition reveals this section
   elements:
     - section header (label + two-line title)
     - 4 project cards in 2×2 grid
       each card: gradient media area, category label, split-text title, description
   stagger: cards reveal via IntersectionObserver (threshold 0.15),
            each card delays by calc(var(--item-index) * 150ms).
            Container: scale(0.92→1) opacity(0→1) 1.2s expo-out.
            Inner media: scale(1.15→1) same duration.
   section_transition: from hero: clip-path inset() closes from bottom.
                       This section is positioned at margin-top: 0 in normal
                       flow immediately below the 100vh hero-wrapper.

   DRL patterns used (project-media-reveal, section 5):
   - IntersectionObserver stagger reveal
   - container scale 0.92→1 + inner scale 1.15→1
   - --ease-expo: cubic-bezier(0.19, 1, 0.22, 1) — brand curve
   - split-text hover on card titles (translateY swap 800ms expo-out)
   - consistent 150ms stagger per item
   - section-scoped theming via CSS custom properties
   ───────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 'token-engine',
    title: 'Token Engine',
    category: 'Core',
    description:
      'Semantic design token management with real-time preview and export to any format.',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  },
  {
    id: 'component-atlas',
    title: 'Component Atlas',
    category: 'Library',
    description:
      'Interactive catalog of every component with live code editing, states, and responsive previews.',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  },
  {
    id: 'theme-studio',
    title: 'Theme Studio',
    category: 'Tooling',
    description:
      'Visual theme builder that generates complete design tokens from a single color seed.',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
  },
  {
    id: 'doc-weaver',
    title: 'Doc Weaver',
    category: 'Documentation',
    description:
      'Auto-generate living documentation from your component library with usage guidelines.',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);

  /* ── IntersectionObserver for card reveal ──
     Each card gets observed once. When it enters the viewport
     (threshold 0.15), the class `project-card--visible` is added.
     CSS handles the stagger via --item-index transition-delay.
     After revealing, the card is unobserved (one-shot animation). */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.project-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('project-card--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects" ref={sectionRef} aria-label="Featured Projects">
      <header className="projects__header">
        <span className="projects__label">Featured Work</span>
        <h2 className="projects__title">
          <span className="projects__title-line">Tools that</span>
          <span className="projects__title-line projects__title-line--accent">
            ship design
          </span>
        </h2>
      </header>

      <div className="projects__grid">
        {PROJECTS.map((project, i) => (
          <article
            key={project.id}
            className="project-card"
            style={{ '--item-index': i }}
          >
            {/* ── media area (gradient placeholder) ── */}
            <div
              className="project-card__media"
              style={{ background: project.gradient }}
              aria-hidden="true"
            />

            <div className="project-card__body">
              <span className="project-card__category">
                {project.category}
              </span>

              {/* ── split-text title ── */}
              <h3 className="project-card__title">
                <span
                  className="project-card__title-text"
                  aria-hidden="true"
                >
                  {project.title}
                </span>
                <span
                  className="project-card__title-text project-card__title-text--hover"
                  aria-hidden="true"
                >
                  {project.title}
                </span>
                <span className="sr-only">{project.title}</span>
              </h3>

              <p className="project-card__description">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
