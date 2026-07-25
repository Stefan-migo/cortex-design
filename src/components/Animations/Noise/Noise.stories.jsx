import { Noise } from './Noise'

const meta = {
  component: Noise,
  tags: ['autodocs'],
  argTypes: {
    patternSize: { control: { type: 'range', min: 10, max: 500, step: 10 } },
    patternAlpha: { control: { type: 'range', min: 0, max: 50, step: 1 } },
    patternRefreshInterval: { control: { type: 'range', min: 0, max: 10, step: 1 } },
  },
}

export default meta

export const Default = {
  args: {
    patternSize: 250,
    patternAlpha: 15,
    patternRefreshInterval: 2,
  },
}

export const Subtle = {
  args: {
    patternSize: 250,
    patternAlpha: 5,
    patternRefreshInterval: 2,
  },
}

export const FineGrain = {
  args: {
    patternSize: 80,
    patternAlpha: 15,
    patternRefreshInterval: 2,
  },
}

export const Static = {
  args: {
    patternSize: 250,
    patternAlpha: 15,
    patternRefreshInterval: 0,
  },
}
