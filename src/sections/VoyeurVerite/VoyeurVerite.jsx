import { useRef, useEffect, useState } from 'react'
import './VoyeurVerite.css'

/* ponytail: 8-point polygons share the same point count so CSS transition on clip-path
   morphs smoothly between them. Each has exactly 8 coordinate pairs.
   Ceiling: limited visual variety — all shapes are star/octagon variants.
   Upgrade: compute shapes procedurally from fewer seed params. */
const CLIP_SHAPES = [
  '50% 0%, 79% 21%, 100% 50%, 79% 79%, 50% 100%, 21% 79%, 0% 50%, 21% 21%',
  '30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%',
  '50% 0%, 100% 50%, 50% 100%, 0% 50%, 50% 0%, 100% 50%, 50% 100%, 0% 50%',
  '50% 5%, 75% 25%, 95% 50%, 75% 75%, 50% 95%, 25% 75%, 5% 50%, 25% 25%',
  '20% 0%, 80% 0%, 100% 30%, 100% 70%, 80% 100%, 20% 100%, 0% 70%, 0% 30%',
  '40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%',
]

/* ponytail: 7 filmmakers as listed in spec. Each has name + quote inline.
   Ceiling: hardcoded data, no CMS/API source.
   Upgrade: accept filmmakers as prop for dynamic content. */
const FILMMAKERS = [
  { name: 'Agnès Varda', quote: 'If we opened people up, we\'d find landscapes.' },
  { name: 'Charles Burnett', quote: 'The beauty in the mundane, the poetry in the everyday.' },
  { name: 'Dziga Vertov', quote: 'I am an eye. A mechanical eye. I show you the world as only I can see it.' },
  { name: 'Jean Rouch', quote: 'The camera is a tool that makes the invisible visible.' },
  { name: 'Les Blank', quote: 'The best films come from the heart, not the head.' },
  { name: 'Marlon Riggs', quote: 'Naming ourselves is an act of resistance.' },
  { name: 'D.A. Pennebaker', quote: 'The camera should be like a fly on the wall.' },
]

const PROJECTS = [
  { title: 'The Symphony of Dance', tags: ['DOCUMENTARY'] },
  { title: 'Stand Up', tags: ['PORTRAIT'] },
  { title: 'Eyes Wide Open', tags: ['EXPERIMENTAL'] },
  { title: 'The Last Frame', tags: ['EDITORIAL'] },
]

const PILLARS_DATA = [
  { num: '01', title: 'Truth', desc: 'We document what others ignore.' },
  { num: '02', title: 'Humility', desc: 'The story matters more than the storyteller.' },
  { num: '03', title: 'Grit', desc: 'We stay when others leave.' },
  { num: '04', title: 'Evolve', desc: 'Every frame teaches us something new.' },
]

/* ponytail: one-shot IntersectionObserver per element, disconnects after first trigger.
   Ceiling: no re-trigger on scroll re-entry.
   Upgrade: remove disconnect for repeated reveal on re-entry. */
function useScrollReveal(ref, threshold = 0.2) {
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || revealed) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, threshold, revealed])
  return revealed
}

export function VoyeurVerite() {
  /* ponytail: all IntersectionObserver targets use refs + useScrollReveal.
     Single pattern, 3 instances. Refs created at top of component for readability. */
  const dividerRef = useRef(null)
  const manifestoRef = useRef(null)
  const pillarsRef = useRef(null)
  const dividerRevealed = useScrollReveal(dividerRef, 0.5)
  const manifestoRevealed = useScrollReveal(manifestoRef, 0.2)
  const pillarsRevealed = useScrollReveal(pillarsRef, 0.1)

  const [carouselIndex, setCarouselIndex] = useState(0)

  const handlePrev = () => {
    setCarouselIndex((i) => (i === 0 ? FILMMAKERS.length - 1 : i - 1))
  }

  const handleNext = () => {
    setCarouselIndex((i) => (i === FILMMAKERS.length - 1 ? 0 : i + 1))
  }

  const filmmaker = FILMMAKERS[carouselIndex]
  const shapeIndex = carouselIndex % CLIP_SHAPES.length

  return (
    <div className="vv">
      {/* ═══ NAV ═══ */}
      <nav className="vv-nav">
        <div className="vv-nav__group">
          <span className="vv-nav__item">About</span>
          <span className="vv-nav__item">Pillars</span>
        </div>
        <span className="vv-nav__divider">|</span>
        <span className="vv-nav__logo">Voyeur Vérité</span>
        <span className="vv-nav__divider">|</span>
        <div className="vv-nav__group">
          <span className="vv-nav__item">Lineage</span>
          <span className="vv-nav__item">Shots</span>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="vv-hero">
        <div className="vv-hero__overlay" />
        <h1 className="vv-hero__title">THE ART OF OBSERVATION</h1>
      </section>

      {/* ═══ DEFINITION ═══ */}
      <section className="vv-definition">
        <div className="vv-definition__col">
          <h2 className="vv-definition__label">Voyeur</h2>
          <p className="vv-definition__text">
            <em>noun</em> | /vwajœʁ/<br />
            One who observes. To witness without interference.
            To see what others overlook. The discipline of
            looking — truly looking — at the world as it is,
            not as we imagine it to be.
          </p>
        </div>

        <div
          ref={dividerRef}
          className={`vv-definition__divider${
            dividerRevealed ? ' vv-definition__divider--revealed' : ''
          }`}
        />

        <div className="vv-definition__col">
          <h2 className="vv-definition__label">Vérité</h2>
          <p className="vv-definition__text">
            <em>noun</em> | /veʁite/<br />
            Truth. Not capital-T Truth, but the small truths
            that accumulate into understanding. The honest frame.
            The unvarnished moment. Reality, captured with
            integrity and purpose.
          </p>
        </div>
      </section>

      {/* ═══ PROJECT GRID ═══ */}
      <section className="vv-projects">
        {PROJECTS.map((project) => (
          <div key={project.title} className="vv-projects__card">
            <div className="vv-projects__overlay">
              <div className="vv-projects__tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="vv-projects__tag">{tag}</span>
                ))}
              </div>
              <h3 className="vv-projects__title">{project.title}</h3>
            </div>
          </div>
        ))}
      </section>

      {/* ═══ MANIFESTO ═══ */}
      <section
        ref={manifestoRef}
        className={`vv-manifesto${manifestoRevealed ? ' vv-manifesto--revealed' : ''}`}
      >
        <p className="vv-manifesto__text">
          Voyeur Vérité is an independent, artist-founded creative studio.
        </p>
      </section>

      {/* ═══ PILLARS ═══ */}
      <section
        ref={pillarsRef}
        className="vv-pillars"
      >
        {PILLARS_DATA.map((pillar, i) => (
          <div
            key={pillar.num}
            className={`vv-pillar${pillarsRevealed ? ' vv-pillar--revealed' : ''}`}
            style={{ '--i': i }}
          >
            <div className="vv-pillar__number">{pillar.num}</div>
            <h3 className="vv-pillar__title">{pillar.title}</h3>
            <p className="vv-pillar__desc">{pillar.desc}</p>
          </div>
        ))}
      </section>

      {/* ═══ CAROUSEL ═══ */}
      <section className="vv-carousel">
        <h2 className="vv-carousel__title">Shaped by Filmmakers</h2>

        <div className="vv-carousel__frame-wrap">
          <button
            className="vv-carousel__arrow"
            onClick={handlePrev}
            aria-label="Previous filmmaker"
          >
            ←
          </button>

          <div
            className="vv-carousel__frame"
            style={{ clipPath: `polygon(${CLIP_SHAPES[shapeIndex]})` }}
          >
            <div className="vv-carousel__content" key={carouselIndex}>
              <p className="vv-carousel__quote">{filmmaker.quote}</p>
              <p className="vv-carousel__name">— {filmmaker.name}</p>
            </div>
          </div>

          <button
            className="vv-carousel__arrow"
            onClick={handleNext}
            aria-label="Next filmmaker"
          >
            →
          </button>
        </div>

        <div className="vv-carousel__counter">
          {String(carouselIndex + 1).padStart(2, '0')} / {String(FILMMAKERS.length).padStart(2, '0')}
        </div>
      </section>
    </div>
  )
}
