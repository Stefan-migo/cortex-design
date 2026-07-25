import { PageTransition } from './PageTransition'

export function CircularWipe({ pages, duration = 600, easing = 'cubic-bezier(0.4,0,0.2,1)', className }) {
  return (
    <PageTransition pages={pages} exitClass="circle-exit" enterClass="circle-enter"
      duration={duration} easing={easing} className={className} />
  )
}
