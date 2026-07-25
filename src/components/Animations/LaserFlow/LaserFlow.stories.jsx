import { LaserFlow } from './LaserFlow'

const meta = {
  component: LaserFlow,
  tags: ['autodocs'],
  argTypes: {
    beamCount: { control: { type: 'range', min: 1, max: 12, step: 1 } },
    color: { control: 'color' },
    speed: { control: { type: 'range', min: 0.1, max: 3, step: 0.1 } },
    width: { control: { type: 'range', min: 1, max: 12, step: 1 } },
  },
}

export default meta

export const Default = {
  args: {
    beamCount: 3,
    color: '#ff3366',
    speed: 1,
    width: 3,
  },
}

export const ManyBeams = {
  args: {
    beamCount: 8,
    color: '#ff3366',
    speed: 1,
    width: 3,
  },
}

export const Thick = {
  args: {
    beamCount: 3,
    color: '#ff3366',
    speed: 1,
    width: 8,
  },
}

export const Blue = {
  args: {
    beamCount: 3,
    color: '#3366ff',
    speed: 1,
    width: 3,
  },
}
