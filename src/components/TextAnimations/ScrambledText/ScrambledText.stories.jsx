import { ScrambledText } from './ScrambledText'

const meta = {
  component: ScrambledText,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    radius: { control: { type: 'range', min: 30, max: 400, step: 10 } },
    duration: { control: { type: 'range', min: 0.2, max: 4, step: 0.2 } },
    chars: { control: 'text' },
  },
}

export default meta

export const Default = {
  args: {
    text: 'Scramble',
    radius: 120,
    duration: 1.2,
    chars: '⁐.·',
  },
}

export const Wide = {
  args: {
    text: 'Wide Radius',
    radius: 250,
    duration: 1.2,
    chars: '⁐.·',
  },
}

export const FastScramble = {
  args: {
    text: 'Fast',
    radius: 120,
    duration: 0.4,
    chars: '⁐.·',
  },
}

export const CustomChars = {
  args: {
    text: 'Custom Set',
    radius: 120,
    duration: 1.2,
    chars: '!@#$%',
  },
}
