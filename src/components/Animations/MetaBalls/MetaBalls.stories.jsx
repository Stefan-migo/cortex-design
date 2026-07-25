import { MetaBalls } from './MetaBalls'

const meta = {
  component: MetaBalls,
  tags: ['autodocs'],
  argTypes: {
    ballCount: { control: { type: 'range', min: 2, max: 25, step: 1 } },
    color: { control: 'color' },
    maxRadius: { control: { type: 'range', min: 20, max: 150, step: 10 } },
    speed: { control: { type: 'range', min: 0.1, max: 3, step: 0.1 } },
  },
}

export default meta

export const Default = {
  args: {
    ballCount: 6,
    color: '#5227FF',
    maxRadius: 60,
    speed: 1,
  },
}

export const ManyBalls = {
  args: {
    ballCount: 15,
    color: '#5227FF',
    maxRadius: 60,
    speed: 1,
  },
}

export const Large = {
  args: {
    ballCount: 6,
    color: '#5227FF',
    maxRadius: 100,
    speed: 1,
  },
}

export const Fast = {
  args: {
    ballCount: 6,
    color: '#5227FF',
    maxRadius: 60,
    speed: 2,
  },
}
