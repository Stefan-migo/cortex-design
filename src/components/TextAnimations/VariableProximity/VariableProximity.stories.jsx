import { VariableProximity } from './VariableProximity'

const meta = {
  component: VariableProximity,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    radius: { control: { type: 'range', min: 50, max: 500, step: 10 } },
    from: { control: { type: 'range', min: -20, max: 0, step: 1 } },
    to: { control: { type: 'range', min: 0, max: 20, step: 1 } },
  },
}

export default meta

export const Default = {
  args: {
    text: 'Proximity Shifts Spacing',
    radius: 150,
    from: -5,
    to: 5,
  },
}

export const Wide = {
  args: {
    text: 'Wide Detection Radius',
    radius: 300,
    from: -5,
    to: 5,
  },
}

export const NarrowRange = {
  args: {
    text: 'Subtle Shift',
    radius: 150,
    from: -2,
    to: 2,
  },
}

export const SlowResponsiveness = {
  args: {
    text: 'Dramatic Spread',
    radius: 150,
    from: -10,
    to: 10,
  },
}
