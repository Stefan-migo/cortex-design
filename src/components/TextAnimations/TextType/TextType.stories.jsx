import { TextType } from './TextType'

const meta = {
  component: TextType,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    speed: { control: { type: 'range', min: 10, max: 300, step: 10 } },
    initialDelay: { control: { type: 'range', min: 0, max: 5000, step: 100 } },
    pauseDuration: { control: { type: 'range', min: 500, max: 8000, step: 500 } },
    loop: { control: 'boolean' },
    showCursor: { control: 'boolean' },
    cursorChar: { control: 'text' },
  },
}

export default meta

export const Default = {
  args: {
    text: 'Typing animation...',
    speed: 50,
    initialDelay: 0,
    pauseDuration: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|',
  },
}

export const NoCursor = {
  args: {
    text: 'No cursor visible',
    speed: 50,
    initialDelay: 0,
    pauseDuration: 2000,
    loop: true,
    showCursor: false,
  },
}

export const Slow = {
  args: {
    text: 'Slow typing...',
    speed: 100,
    initialDelay: 0,
    pauseDuration: 2000,
    loop: true,
    showCursor: true,
  },
}

export const NoLoop = {
  args: {
    text: 'Types once and stops',
    speed: 50,
    initialDelay: 0,
    pauseDuration: 2000,
    loop: false,
    showCursor: true,
  },
}
