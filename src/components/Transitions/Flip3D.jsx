import { PageTransition } from './PageTransition'

export function Flip3D({ pages, duration = 650, easing = 'cubic-bezier(0.4,0,0.2,1)', className }) {
  return (
    <PageTransition pages={pages} exitClass="flip3d-exit" enterClass="flip3d-enter"
      duration={duration} easing={easing} className={className} />
  )
}
