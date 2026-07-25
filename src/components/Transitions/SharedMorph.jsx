import { PageTransition } from './PageTransition'

export function SharedMorph({ pages, duration = 550, easing = 'cubic-bezier(0.16,1,0.3,1)', className }) {
  return (
    <PageTransition pages={pages} exitClass="morph-exit" enterClass="morph-enter"
      duration={duration} easing={easing} className={className} />
  )
}
