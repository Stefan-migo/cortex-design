import { PageTransition } from './PageTransition'

export function StaggerWipe({ pages, duration = 500, easing = 'cubic-bezier(0.65,0,0.35,1)', className }) {
  return (
    <PageTransition pages={pages} exitClass="stagger-exit" enterClass="stagger-enter"
      duration={duration} easing={easing} className={className} />
  )
}
