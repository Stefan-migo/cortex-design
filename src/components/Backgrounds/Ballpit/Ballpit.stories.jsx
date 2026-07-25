import { Ballpit } from './Ballpit'

const meta = {
  component: Ballpit,
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'range', min: 10, max: 500, step: 10 } },
    followCursor: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: {
    count: 200,
    followCursor: true,
  },
}

export const FewBalls = {
  args: {
    count: 50,
    followCursor: true,
  },
}

export const NoFollow = {
  args: {
    count: 200,
    followCursor: false,
  },
}
