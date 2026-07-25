import { PageTransition } from './PageTransition'

export function FadeScale({ pages, duration = 400, easing = 'cubic-bezier(0.16,1,0.3,1)', scale = 0.92, className }) {
  return (
    <PageTransition pages={pages} exitClass="fadescale-exit" enterClass="fadescale-enter"
      duration={duration} easing={easing} className={className}
      vars={{ '--scale': String(scale), '--scale-start': '1.08' }} />
  )
}
