import { PixelTrail } from './PixelTrail'

const meta = {
  component: PixelTrail,
  tags: ['autodocs'],
  argTypes: {
    trailLength: { control: { type: 'range', min: 5, max: 120, step: 5 } },
    pixelSize: { control: { type: 'range', min: 2, max: 20, step: 1 } },
    color: { control: 'color' },
    fadeSpeed: { control: { type: 'range', min: 0.005, max: 0.1, step: 0.005 } },
    rainbow: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: {
    trailLength: 30,
    pixelSize: 8,
    color: '#5227FF',
    fadeSpeed: 0.03,
  },
}

export const LongTrail = {
  args: {
    trailLength: 80,
    pixelSize: 8,
    color: '#5227FF',
    fadeSpeed: 0.03,
  },
}

export const SmallPixels = {
  args: {
    trailLength: 30,
    pixelSize: 4,
    color: '#5227FF',
    fadeSpeed: 0.03,
  },
}

export const Rainbow = {
  args: {
    trailLength: 30,
    pixelSize: 8,
    color: '#5227FF',
    fadeSpeed: 0.03,
    rainbow: true,
  },
}
