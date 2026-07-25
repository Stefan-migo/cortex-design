import { PageTransition } from './PageTransition'

export function SplitCurtainV({ pages, duration = 550, easing = 'cubic-bezier(0.77,0,0.175,1)', className }) {
  return (
    <PageTransition pages={pages} exitClass="curtainv-exit" enterClass="curtainv-enter"
      duration={duration} easing={easing} className={className} />
  )
}
