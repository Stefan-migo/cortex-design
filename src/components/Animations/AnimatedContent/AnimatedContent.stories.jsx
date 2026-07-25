import { AnimatedContent } from './AnimatedContent'

const meta = {
  component: AnimatedContent,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    splitBy: { control: 'select', options: ['chars', 'words'] },
    staggerMs: { control: { type: 'range', min: 10, max: 200, step: 10 } },
    duration: { control: { type: 'range', min: 0.3, max: 3, step: 0.1 } },
    threshold: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
}

export default meta

export const Default = {
  args: {
    children: 'Hello World',
    splitBy: 'chars',
    staggerMs: 50,
    duration: 1,
    threshold: 0,
  },
}

export const ByWord = {
  args: {
    children: 'Animated by word',
    splitBy: 'words',
    staggerMs: 100,
    duration: 0.8,
    threshold: 0,
  },
}

export const Fast = {
  args: {
    children: 'Quick entry',
    splitBy: 'chars',
    staggerMs: 20,
    duration: 0.3,
    threshold: 0,
  },
}

export const Slow = {
  args: {
    children: 'Slow reveal',
    splitBy: 'chars',
    staggerMs: 100,
    duration: 2,
    threshold: 0,
  },
}
