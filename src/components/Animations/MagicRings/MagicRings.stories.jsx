import { MagicRings } from './MagicRings'

const meta = {
  component: MagicRings,
  tags: ['autodocs'],
  argTypes: {
    ringColor: { control: 'color' },
    maxRings: { control: { type: 'range', min: 5, max: 80, step: 5 } },
    ringWidth: { control: { type: 'range', min: 1, max: 10, step: 1 } },
    expansionSpeed: { control: { type: 'range', min: 0.5, max: 8, step: 0.5 } },
    rainbow: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: {
    ringColor: '#5227FF',
    maxRings: 20,
    ringWidth: 2,
    expansionSpeed: 2,
  },
}

export const ManyRings = {
  args: {
    ringColor: '#5227FF',
    maxRings: 50,
    ringWidth: 2,
    expansionSpeed: 2,
  },
}

export const Thick = {
  args: {
    ringColor: '#5227FF',
    maxRings: 20,
    ringWidth: 6,
    expansionSpeed: 2,
  },
}

export const Fast = {
  args: {
    ringColor: '#5227FF',
    maxRings: 20,
    ringWidth: 2,
    expansionSpeed: 5,
  },
}

export const Rainbow = {
  args: {
    ringColor: '#5227FF',
    maxRings: 20,
    ringWidth: 2,
    expansionSpeed: 2,
    rainbow: true,
  },
}
