import { GhostCursor } from './GhostCursor'

const meta = {
  component: GhostCursor,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    trailLength: { control: { type: 'number', min: 5, max: 200, step: 5 } },
    size: { control: { type: 'number', min: 5, max: 80, step: 2 } },
    glowSize: { control: { type: 'number', min: 5, max: 100, step: 5 } },
  },
}

export default meta

export const Default = {
  args: {
    trailLength: 50,
    color: '#B497CF',
    size: 20,
  },
}

export const LongTrail = {
  args: {
    trailLength: 100,
    color: '#B497CF',
    size: 20,
  },
}

export const Large = {
  args: {
    trailLength: 50,
    color: '#B497CF',
    size: 40,
  },
}

export const StrongGlow = {
  args: {
    trailLength: 50,
    color: '#B497CF',
    size: 20,
    glowSize: 60,
  },
}

export const DifferentColor = {
  args: {
    trailLength: 50,
    color: '#00E5FF',
    size: 20,
  },
}
