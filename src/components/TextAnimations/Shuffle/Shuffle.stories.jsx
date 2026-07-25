import { Shuffle } from './Shuffle'

const meta = {
  component: Shuffle,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    duration: { control: { type: 'range', min: 0.1, max: 2, step: 0.05 } },
    staggerMs: { control: { type: 'range', min: 0, max: 200, step: 10 } },
    direction: { control: 'select', options: ['right', 'left', 'up', 'down'] },
    threshold: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
}

export default meta

export const Default = {
  args: {
    text: 'Shuffle In',
    duration: 0.35,
    staggerMs: 30,
    direction: 'right',
    threshold: 0.1,
  },
}

export const FromLeft = {
  args: {
    text: 'From Left',
    duration: 0.35,
    staggerMs: 30,
    direction: 'left',
    threshold: 0.1,
  },
}

export const StaggerHeavy = {
  args: {
    text: 'Stagger Heavy',
    duration: 0.35,
    staggerMs: 100,
    direction: 'right',
    threshold: 0.1,
  },
}

export const Fast = {
  args: {
    text: 'Fast',
    duration: 0.15,
    staggerMs: 15,
    direction: 'right',
    threshold: 0.1,
  },
}
