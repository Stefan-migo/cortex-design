import { PageTransition } from './PageTransition'

export function PushParallax({ pages, duration = 500, easing = 'cubic-bezier(0.32,0.72,0,1)', scale = 0.92, className }) {
  return (
    <PageTransition pages={pages} exitClass="push-exit" enterClass="push-enter"
      duration={duration} easing={easing} className={className}
      vars={{ '--scale': String(scale) }} />
  )
}
