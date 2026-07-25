import { SplitText } from './SplitText'

const meta = {
  component: SplitText,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    splitBy: { control: 'select', options: ['chars', 'words'] },
    staggerMs: { control: { type: 'range', min: 0, max: 300, step: 10 } },
    duration: { control: { type: 'range', min: 0.2, max: 3, step: 0.05 } },
    threshold: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    tag: { control: 'select', options: ['p', 'h1', 'h2', 'div'] },
  },
}

export default meta

export const Default = {
  args: {
    text: 'Reveal Text',
    splitBy: 'chars',
    staggerMs: 50,
    duration: 1.25,
    threshold: 0.1,
    tag: 'p',
  },
}

export const ByWord = {
  args: {
    text: 'Word by Word Reveal',
    splitBy: 'words',
    staggerMs: 80,
    duration: 1.25,
    threshold: 0.1,
    tag: 'p',
  },
}

export const Fast = {
  args: {
    text: 'Fast Reveal',
    splitBy: 'chars',
    staggerMs: 20,
    duration: 0.5,
    threshold: 0.1,
    tag: 'p',
  },
}

export const FromTop = {
  args: {
    text: 'From Top',
    splitBy: 'chars',
    staggerMs: 50,
    duration: 0.8,
    threshold: 0.1,
    tag: 'h2',
  },
}

export const H1Tag = {
  args: {
    text: 'Heading Reveal',
    splitBy: 'chars',
    staggerMs: 40,
    duration: 1.5,
    threshold: 0.3,
    tag: 'h1',
  },
}
