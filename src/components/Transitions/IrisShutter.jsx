import { PageTransition } from './PageTransition'

export function IrisShutter({ pages, duration = 600, easing = 'cubic-bezier(0.77,0,0.175,1)', className }) {
  return (
    <PageTransition pages={pages} exitClass="shutter-exit" enterClass="shutter-enter"
      duration={duration} easing={easing} className={className} />
  )
}
