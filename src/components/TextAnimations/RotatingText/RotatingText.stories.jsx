import { RotatingText } from './RotatingText'

const meta = {
  component: RotatingText,
  tags: ['autodocs'],
  argTypes: {
    texts: { control: 'object' },
    interval: { control: { type: 'range', min: 500, max: 6000, step: 500 } },
    staggerMs: { control: { type: 'range', min: 0, max: 200, step: 10 } },
    splitBy: { control: 'select', options: ['chars', 'words'] },
  },
}

export default meta

export const Default = {
  args: {
    texts: ['Explore', 'Design', 'Ship'],
    interval: 2000,
    staggerMs: 30,
    splitBy: 'chars',
  },
}

export const Fast = {
  args: {
    texts: ['Fast', 'Cycle', 'Loop'],
    interval: 1000,
    staggerMs: 20,
    splitBy: 'chars',
  },
}

export const Slow = {
  args: {
    texts: ['Slow', 'Motion', 'Text'],
    interval: 4000,
    staggerMs: 60,
    splitBy: 'chars',
  },
}

export const StaggerWords = {
  args: {
    texts: ['Cycle Words', 'One Phrase', 'After Another'],
    interval: 2500,
    staggerMs: 80,
    splitBy: 'words',
  },
}

export const SingleChar = {
  args: {
    texts: ['A', 'B', 'C', 'D', 'E'],
    interval: 1500,
    staggerMs: 0,
    splitBy: 'chars',
  },
}
