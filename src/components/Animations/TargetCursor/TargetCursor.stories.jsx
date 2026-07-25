import { TargetCursor } from './TargetCursor'

const meta = {
  component: TargetCursor,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    ringCount: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    size: { control: { type: 'range', min: 20, max: 120, step: 5 } },
    clickEffect: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: {
    color: '#5227FF',
    ringCount: 3,
    size: 40,
    clickEffect: true,
  },
}

export const Large = {
  args: {
    color: '#5227FF',
    ringCount: 3,
    size: 80,
    clickEffect: true,
  },
}

export const NoClickEffect = {
  args: {
    color: '#5227FF',
    ringCount: 3,
    size: 40,
    clickEffect: false,
  },
}

export const Red = {
  args: {
    color: '#FF2222',
    ringCount: 4,
    size: 40,
    clickEffect: true,
  },
}
