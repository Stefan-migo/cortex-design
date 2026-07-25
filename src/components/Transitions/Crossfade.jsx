import { PageTransition } from './PageTransition'

export function Crossfade({ pages, duration = 350, easing = 'ease-out', className }) {
  return (
    <PageTransition pages={pages} exitClass="xfade-exit" enterClass="xfade-enter"
      duration={duration} easing={easing} className={className} />
  )
}
