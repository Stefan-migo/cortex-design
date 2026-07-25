import { ScrollVelocity } from './ScrollVelocity'

const meta = {
  component: ScrollVelocity,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    speed: { control: { type: 'range', min: 0.1, max: 5, step: 0.1 } },
    direction: { control: 'select', options: ['left', 'right'] },
  },
}

export default meta

export const Default = {
  args: {
    text: 'Horizontal Scroll Velocity · ',
    speed: 1,
    direction: 'left',
  },
}

export const Fast = {
  args: {
    text: 'Fast Velocity · ',
    speed: 3,
    direction: 'left',
  },
}

export const RightDirection = {
  args: {
    text: 'Rightward Velocity · ',
    speed: 1,
    direction: 'right',
  },
}
