import { CountUp } from './CountUp'

const meta = {
  component: CountUp,
  tags: ['autodocs'],
  argTypes: {
    to: { control: 'number' },
    from: { control: 'number' },
    duration: { control: { type: 'range', min: 0.1, max: 6, step: 0.1 } },
    delay: { control: { type: 'range', min: 0, max: 5, step: 0.5 } },
    separator: { control: 'text' },
    startWhen: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: {
    to: 100,
    from: 0,
    duration: 2,
    startWhen: true,
  },
}

export const LargeNumber = {
  args: {
    to: 1000000,
    from: 0,
    duration: 2,
    separator: ',',
    startWhen: true,
  },
}

export const Fast = {
  args: {
    to: 100,
    from: 0,
    duration: 0.5,
    startWhen: true,
  },
}

export const WithDelay = {
  args: {
    to: 100,
    from: 0,
    duration: 2,
    delay: 2,
    startWhen: true,
  },
}
