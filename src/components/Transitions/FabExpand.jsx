import { PageTransition } from './PageTransition'

export function FabExpand({ pages, duration = 500, easing = 'cubic-bezier(0.2,0.8,0.2,1)', className }) {
  return (
    <PageTransition pages={pages} exitClass="fab-exit" enterClass="fab-enter"
      duration={duration} easing={easing} className={className} />
  )
}
