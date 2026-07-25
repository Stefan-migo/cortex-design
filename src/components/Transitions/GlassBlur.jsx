import { PageTransition } from './PageTransition'

export function GlassBlur({ pages, duration = 450, easing = 'ease-out', blur = 16, className }) {
  return (
    <PageTransition pages={pages} exitClass="glass-exit" enterClass="glass-enter"
      duration={duration} easing={easing} className={className}
      vars={{ '--blur': `${blur}px` }} />
  )
}
