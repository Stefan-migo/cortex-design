import { FallingText } from './FallingText'

const meta = {
  component: FallingText,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    trigger: { control: 'select', options: ['click', 'auto', 'scroll'] },
    gravity: { control: { type: 'range', min: 0.1, max: 2, step: 0.1 } },
  },
}

export default meta

export const Default = {
  args: {
    text: 'Click to Fall',
    trigger: 'click',
    gravity: 0.5,
  },
}

export const AutoTrigger = {
  args: {
    text: 'Auto Fall',
    trigger: 'auto',
    gravity: 0.5,
  },
}

export const LightGravity = {
  args: {
    text: 'Light Gravity',
    trigger: 'click',
    gravity: 0.2,
  },
}

export const ScrollTrigger = {
  args: {
    text: 'Scroll to Fall',
    trigger: 'scroll',
    gravity: 0.5,
  },
}
