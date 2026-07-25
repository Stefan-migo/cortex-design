import { Aurora } from './Aurora'

const meta = {
  component: Aurora,
  tags: ['autodocs'],
  argTypes: {
    colorStops: { control: 'object' },
    amplitude: { control: { type: 'range', min: 0, max: 2, step: 0.1 } },
    blend: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    speed: { control: { type: 'range', min: 0.1, max: 3, step: 0.1 } },
  },
}

export default meta

export const Default = {
  args: {
    colorStops: ['#5227FF', '#7cff67', '#5227FF'],
    amplitude: 1.0,
    blend: 0.5,
    speed: 1.0,
  },
}

export const GreenAurora = {
  args: {
    colorStops: ['#00ff87', '#60efff', '#00ff87'],
    amplitude: 1.2,
    blend: 0.3,
    speed: 0.8,
  },
}

export const WarmAurora = {
  args: {
    colorStops: ['#ff6b6b', '#ffd93d', '#ff6b6b'],
    amplitude: 0.8,
    blend: 0.7,
    speed: 1.5,
  },
}
