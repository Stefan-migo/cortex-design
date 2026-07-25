import { Ribbons } from './Ribbons'

const meta = {
  component: Ribbons,
  tags: ['autodocs'],
  argTypes: {
    ribbonCount: { control: { type: 'range', min: 1, max: 16, step: 1 } },
    color: { control: 'color' },
    speed: { control: { type: 'range', min: 0.1, max: 3, step: 0.1 } },
    width: { control: { type: 'range', min: 1, max: 12, step: 1 } },
  },
}

export default meta

export const Default = {
  args: {
    ribbonCount: 5,
    color: '#ff3366',
    speed: 1,
    width: 4,
  },
}

export const ManyRibbons = {
  args: {
    ribbonCount: 12,
    color: '#ff3366',
    speed: 1,
    width: 4,
  },
}

export const Thick = {
  args: {
    ribbonCount: 5,
    color: '#ff3366',
    speed: 1,
    width: 8,
  },
}

export const Slow = {
  args: {
    ribbonCount: 5,
    color: '#ff3366',
    speed: 0.3,
    width: 4,
  },
}
