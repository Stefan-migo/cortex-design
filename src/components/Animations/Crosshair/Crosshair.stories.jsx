import { Crosshair } from './Crosshair'

const meta = {
  component: Crosshair,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    size: { control: { type: 'range', min: 10, max: 80, step: 5 } },
    thickness: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    gap: { control: { type: 'range', min: 0, max: 30, step: 1 } },
  },
}

export default meta

export const Default = {
  args: {
    color: '#5227FF',
    size: 20,
    thickness: 2,
    gap: 5,
  },
}

export const Large = {
  args: {
    color: '#5227FF',
    size: 40,
    thickness: 2,
    gap: 10,
  },
}

export const Thin = {
  args: {
    color: '#5227FF',
    size: 20,
    thickness: 1,
    gap: 5,
  },
}

export const DifferentColor = {
  args: {
    color: '#FF2222',
    size: 20,
    thickness: 2,
    gap: 5,
  },
}
