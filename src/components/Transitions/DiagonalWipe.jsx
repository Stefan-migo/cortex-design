import { PageTransition } from './PageTransition'

export function DiagonalWipe({ pages, duration = 500, easing = 'cubic-bezier(0.22,1,0.36,1)', className }) {
  return (
    <PageTransition pages={pages} exitClass="diag-exit" enterClass="diag-enter"
      duration={duration} easing={easing} className={className} />
  )
}
