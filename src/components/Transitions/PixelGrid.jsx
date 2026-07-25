import { PageTransition } from './PageTransition'

export function PixelGrid({ pages, duration = 650, easing = 'cubic-bezier(0.25,1,0.5,1)', className }) {
  return (
    <PageTransition pages={pages} exitClass="pixel-exit" enterClass="pixel-enter"
      duration={duration} easing={easing} className={className} />
  )
}
