import { PageTransition } from './PageTransition'

const DIR = {
  right: { exitX: '-100%', exitY: '0', enterX: '100%', enterY: '0' },
  left:  { exitX: '100%', exitY: '0', enterX: '-100%', enterY: '0' },
  down:  { exitX: '0', exitY: '-100%', enterX: '0', enterY: '100%' },
  up:    { exitX: '0', exitY: '100%', enterX: '0', enterY: '-100%' },
}

export function SlideHorizontal({ pages, duration = 450, easing = 'cubic-bezier(0.25,1,0.5,1)', direction = 'right', className }) {
  const d = DIR[direction] || DIR.right
  return (
    <PageTransition pages={pages} exitClass="slide-exit" enterClass="slide-enter"
      duration={duration} easing={easing} className={className}
      vars={{ '--exit-x': d.exitX, '--exit-y': d.exitY, '--enter-x': d.enterX, '--enter-y': d.enterY }} />
  )
}
