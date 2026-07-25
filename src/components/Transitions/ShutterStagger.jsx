import { PageTransition } from './PageTransition'

export function ShutterStagger({ pages, duration = 500, easing = 'cubic-bezier(0.25,1,0.5,1)', className }) {
  return (
    <PageTransition pages={pages} exitClass="shut-exit" enterClass="shut-enter"
      duration={duration} easing={easing} className={className} />
  )
}
