import { ScrollFloat } from './ScrollFloat'

const meta = {
  component: ScrollFloat,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    splitBy: { control: 'select', options: ['words', 'chars'] },
    staggerMs: { control: { type: 'range', min: 0, max: 200, step: 10 } },
    duration: { control: { type: 'range', min: 0.2, max: 3, step: 0.1 } },
    threshold: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
}

export default meta

export const Default = {
  args: {
    children: 'Float In Text',
    splitBy: 'words',
    staggerMs: 30,
    duration: 1,
    ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    threshold: 0.1,
  },
}

export const ByCharacter = {
  args: {
    children: 'Character Float',
    splitBy: 'chars',
    staggerMs: 20,
    duration: 0.8,
    ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    threshold: 0.1,
  },
}

export const Fast = {
  args: {
    children: 'Fast Float',
    splitBy: 'words',
    staggerMs: 15,
    duration: 0.5,
    ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    threshold: 0.1,
  },
}

export const Bouncy = {
  args: {
    children: 'Bouncy Float',
    splitBy: 'words',
    staggerMs: 40,
    duration: 1.2,
    ease: 'cubic-bezier(0.1, 2.5, 0.4, 1)',
    threshold: 0.1,
  },
}
