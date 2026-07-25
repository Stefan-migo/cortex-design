import { ShinyText } from './ShinyText'

const meta = {
  component: ShinyText,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    speed: { control: { type: 'range', min: 0.5, max: 6, step: 0.5 } },
    shineColor: { control: 'color' },
    color: { control: 'color' },
    spread: { control: { type: 'range', min: 0, max: 90, step: 5 } },
    direction: { control: 'select', options: ['left', 'right', 'yoyo'] },
  },
}

export default meta

export const Default = {
  args: {
    text: 'Shiny Text',
    speed: 2,
    shineColor: '#ffffff',
    color: '#555555',
    spread: 45,
    direction: 'left',
  },
}

export const Slow = {
  args: {
    text: 'Slow Shine',
    speed: 4,
    shineColor: '#ffffff',
    color: '#555555',
    spread: 45,
    direction: 'left',
  },
}

export const RightToLeft = {
  args: {
    text: 'Right to Left',
    speed: 2,
    shineColor: '#ffffff',
    color: '#555555',
    spread: 45,
    direction: 'right',
  },
}

export const Yoyo = {
  args: {
    text: 'Yoyo',
    speed: 2,
    shineColor: '#ffffff',
    color: '#555555',
    spread: 45,
    direction: 'yoyo',
  },
}
