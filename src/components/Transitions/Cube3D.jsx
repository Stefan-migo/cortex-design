import { PageTransition } from './PageTransition'

export function Cube3D({ pages, duration = 700, easing = 'cubic-bezier(0.645,0.045,0.355,1)', className }) {
  return (
    <PageTransition pages={pages} exitClass="cube3d-exit" enterClass="cube3d-enter"
      duration={duration} easing={easing} className={className} />
  )
}
