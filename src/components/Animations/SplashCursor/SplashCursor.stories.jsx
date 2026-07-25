import { SplashCursor } from './SplashCursor'

const meta = {
  component: SplashCursor,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    rainbowMode: { control: 'boolean' },
    splatRadius: { control: { type: 'range', min: 0.05, max: 1, step: 0.05 } },
  },
}

export default meta

export const Default = {
  args: {
    color: '#ff0000',
    rainbowMode: false,
    splatRadius: 0.2,
  },
}

export const Rainbow = {
  args: {
    color: '#ff0000',
    rainbowMode: true,
    splatRadius: 0.2,
  },
}

export const LargeSplats = {
  args: {
    color: '#ff0000',
    rainbowMode: false,
    splatRadius: 0.6,
  },
}

export const SingleColor = {
  args: {
    color: '#00bfff',
    rainbowMode: false,
    splatRadius: 0.2,
  },
}
