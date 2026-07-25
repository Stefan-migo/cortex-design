import { PageTransition } from './PageTransition'

export function ClipShapeWipe({ pages, duration = 500, easing = 'cubic-bezier(0.16,1,0.3,1)', className }) {
  return (
    <PageTransition pages={pages} exitClass="clipexit" enterClass="clipenter"
      duration={duration} easing={easing} className={className} />
  )
}
