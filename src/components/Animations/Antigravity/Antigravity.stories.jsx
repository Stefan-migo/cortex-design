import { Antigravity } from './Antigravity'

const meta = {
  component: Antigravity,
  tags: ['autodocs'],
  argTypes: {
    particleCount: { control: { type: 'range', min: 10, max: 200, step: 10 } },
    particleSize: { control: { type: 'range', min: 1, max: 10, step: 1 } },
    speed: { control: { type: 'range', min: 0.1, max: 3, step: 0.1 } },
    mouseInfluence: { control: 'boolean' },
    color: { control: 'color' },
  },
}

export default meta

export const Default = {
  args: {
    particleCount: 50,
    particleSize: 3,
    speed: 0.5,
    mouseInfluence: true,
    color: '#ffffff',
  },
}

export const ManyParticles = {
  args: {
    particleCount: 150,
    particleSize: 3,
    speed: 0.5,
    mouseInfluence: true,
    color: '#ffffff',
  },
}

export const Fast = {
  args: {
    particleCount: 50,
    particleSize: 3,
    speed: 2,
    mouseInfluence: true,
    color: '#ffffff',
  },
}

export const NoMouse = {
  args: {
    particleCount: 50,
    particleSize: 3,
    speed: 0.5,
    mouseInfluence: false,
    color: '#ffffff',
  },
}
