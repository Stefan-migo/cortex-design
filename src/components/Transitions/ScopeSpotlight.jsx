import { PageTransition } from './PageTransition'

export function ScopeSpotlight({ pages, duration = 550, easing = 'cubic-bezier(0.4,0,0.2,1)', className }) {
  return (
    <PageTransition pages={pages} exitClass="scope-exit" enterClass="scope-enter"
      duration={duration} easing={easing} className={className} />
  )
}
