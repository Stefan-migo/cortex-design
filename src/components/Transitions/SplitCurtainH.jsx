import { PageTransition } from './PageTransition'

export function SplitCurtainH({ pages, duration = 550, easing = 'cubic-bezier(0.77,0,0.175,1)', className }) {
  return (
    <PageTransition pages={pages} exitClass="curtainh-exit" enterClass="curtainh-enter"
      duration={duration} easing={easing} className={className} />
  )
}
