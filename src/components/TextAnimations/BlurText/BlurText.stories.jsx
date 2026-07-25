import { BlurText } from './BlurText'

const meta = {
  component: BlurText,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    delay: { control: { type: 'range', min: 0, max: 300, step: 10 } },
    animateBy: { control: 'select', options: ['words', 'chars'] },
    direction: { control: 'select', options: ['top', 'bottom'] },
    threshold: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
}

export default meta

export const Default = {
  args: {
    text: 'Blur In Text',
    delay: 50,
    animateBy: 'words',
    direction: 'top',
    threshold: 0.1,
  },
}

export const ByCharacter = {
  args: {
    text: 'Character by Character',
    delay: 30,
    animateBy: 'chars',
    direction: 'top',
    threshold: 0.1,
  },
}

export const FromBottom = {
  args: {
    text: 'From Below',
    delay: 50,
    animateBy: 'words',
    direction: 'bottom',
    threshold: 0.1,
  },
}

export const Fast = {
  args: {
    text: 'Fast',
    delay: 0,
    animateBy: 'words',
    direction: 'top',
    threshold: 0.1,
  },
}

export const Slow = {
  args: {
    text: 'S l o w',
    delay: 200,
    animateBy: 'words',
    direction: 'top',
    threshold: 0.1,
  },
}
