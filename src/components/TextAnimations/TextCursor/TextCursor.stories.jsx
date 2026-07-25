import { TextCursor } from './TextCursor'

const meta = {
  component: TextCursor,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    spacing: { control: { type: 'range', min: 10, max: 200, step: 10 } },
    maxPoints: { control: { type: 'range', min: 1, max: 50, step: 1 } },
    exitDuration: { control: { type: 'range', min: 0.1, max: 3, step: 0.1 } },
    randomFloat: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: {
    text: '⚛️',
    spacing: 50,
    maxPoints: 8,
    exitDuration: 0.5,
    randomFloat: true,
  },
}

export const CustomText = {
  args: {
    text: '★',
    spacing: 50,
    maxPoints: 8,
    exitDuration: 0.5,
    randomFloat: true,
  },
}

export const ManyPoints = {
  args: {
    text: '⚛️',
    spacing: 20,
    maxPoints: 20,
    exitDuration: 0.8,
    randomFloat: true,
  },
}

export const NoFloat = {
  args: {
    text: '⚛️',
    spacing: 50,
    maxPoints: 8,
    exitDuration: 0.5,
    randomFloat: false,
  },
}
