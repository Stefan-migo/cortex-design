import { Strands } from './Strands'

const meta = {
  component: Strands,
  tags: ['autodocs'],
  argTypes: {
    strandCount: { control: { type: 'range', min: 5, max: 120, step: 5 } },
    segmentLength: { control: { type: 'range', min: 2, max: 30, step: 2 } },
    color: { control: 'color' },
    mouseRadius: { control: { type: 'range', min: 30, max: 300, step: 10 } },
  },
}

export default meta

export const Default = {
  args: {
    strandCount: 30,
    segmentLength: 10,
    color: '#ffffff',
    mouseRadius: 100,
  },
}

export const ManyStrands = {
  args: {
    strandCount: 80,
    segmentLength: 10,
    color: '#ffffff',
    mouseRadius: 100,
  },
}

export const Short = {
  args: {
    strandCount: 30,
    segmentLength: 5,
    color: '#ffffff',
    mouseRadius: 100,
  },
}

export const NoMouse = {
  args: {
    strandCount: 30,
    segmentLength: 10,
    color: '#ffffff',
    mouseRadius: 0,
  },
}
