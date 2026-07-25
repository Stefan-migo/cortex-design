import { TrueFocus } from './TrueFocus'

const meta = {
  component: TrueFocus,
  tags: ['autodocs'],
  argTypes: {
    sentence: { control: 'text' },
    separator: { control: 'text' },
    manualMode: { control: 'boolean' },
    blurAmount: { control: { type: 'range', min: 0, max: 20, step: 1 } },
    borderColor: { control: 'color' },
    glowColor: { control: 'color' },
    animationDuration: { control: { type: 'range', min: 0.1, max: 3, step: 0.1 } },
    pauseDuration: { control: { type: 'range', min: 0, max: 5, step: 0.5 } },
  },
}

export default meta

export const Default = {
  args: {
    sentence: 'Focus follows the highlighted word',
    separator: ' ',
    manualMode: false,
    blurAmount: 5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    glowColor: 'rgba(255, 255, 255, 0.6)',
    animationDuration: 0.5,
    pauseDuration: 1,
  },
}

export const Slow = {
  args: {
    sentence: 'Slow motion focus shift',
    separator: ' ',
    manualMode: false,
    blurAmount: 5,
    animationDuration: 0.5,
    pauseDuration: 3,
  },
}

export const ManualMode = {
  args: {
    sentence: 'Click each word to focus',
    separator: ' ',
    manualMode: true,
    blurAmount: 5,
    animationDuration: 0.3,
    pauseDuration: 0,
  },
}

export const LargeBlur = {
  args: {
    sentence: 'High blur makes it dramatic',
    separator: ' ',
    manualMode: false,
    blurAmount: 15,
    animationDuration: 0.5,
    pauseDuration: 1,
  },
}
