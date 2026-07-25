import { Balatro } from './Balatro'

const meta = {
  component: Balatro,
  tags: ['autodocs'],
  argTypes: {
    spinRotation: { control: { type: 'range', min: -5, max: 5, step: 0.5 } },
    spinSpeed: { control: { type: 'range', min: 0.1, max: 15, step: 0.5 } },
    color1: { control: 'color' },
    color2: { control: 'color' },
    color3: { control: 'color' },
    contrast: { control: { type: 'range', min: 0.5, max: 8, step: 0.5 } },
    lighting: { control: { type: 'range', min: 0, max: 2, step: 0.1 } },
    pixelFilter: { control: { type: 'range', min: 100, max: 1500, step: 50 } },
    isRotate: { control: 'boolean' },
    mouseInteraction: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: {
    spinRotation: -2.0,
    spinSpeed: 7.0,
    color1: '#DE443B',
    color2: '#006BB4',
    color3: '#162325',
    contrast: 3.5,
    lighting: 0.4,
    spinAmount: 0.25,
    pixelFilter: 745.0,
    spinEase: 1.0,
    isRotate: false,
    mouseInteraction: true,
  },
}

export const BlueShift = {
  args: {
    color1: '#1a5276',
    color2: '#85c1e9',
    color3: '#0a1628',
    contrast: 4.5,
    lighting: 0.6,
    spinRotation: -1.5,
    spinSpeed: 5.0,
  },
}

export const SlowSpin = {
  args: {
    spinSpeed: 2.0,
    isRotate: true,
    contrast: 3.0,
    lighting: 0.5,
  },
}
