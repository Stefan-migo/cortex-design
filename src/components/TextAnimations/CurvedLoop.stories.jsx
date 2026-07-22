import { CurvedLoop } from './CurvedLoop'

const meta = {
  component: CurvedLoop,
  tags: ['autodocs'],
  argTypes: {
    marqueeText: { control: 'text' },
    speed: { control: { type: 'range', min: 0.5, max: 5, step: 0.5 } },
    curveAmount: { control: { type: 'range', min: 50, max: 800, step: 50 } },
    direction: { control: 'select', options: ['left', 'right'] },
    interactive: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: { marqueeText: 'Cortex Design Library', speed: 2, curveAmount: 400, direction: 'left', interactive: true },
}

export const FastRight = {
  args: { marqueeText: 'Cortex Design Library', speed: 4, curveAmount: 400, direction: 'right', interactive: true },
}

export const ExtremeCurve = {
  args: { marqueeText: 'Cortex Design Library', speed: 2, curveAmount: 800, direction: 'left', interactive: true },
}

export const Stationary = {
  args: { marqueeText: 'Cortex Design Library', speed: 0.5, curveAmount: 400, direction: 'left', interactive: false },
}
