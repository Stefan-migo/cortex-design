import { ShapeBlur } from './ShapeBlur'

const meta = {
  component: ShapeBlur,
  tags: ['autodocs'],
  argTypes: {
    shapes: { control: { type: 'range', min: 1, max: 10, step: 1 } },
    blurMin: { control: { type: 'range', min: 0, max: 30, step: 1 } },
    blurMax: { control: { type: 'range', min: 1, max: 60, step: 1 } },
    color: { control: 'color' },
    speed: { control: { type: 'range', min: 0.1, max: 3, step: 0.1 } },
  },
}

export default meta

export const Default = {
  args: {
    shapes: 3,
    blurMin: 0,
    blurMax: 20,
    color: '#5227FF',
    speed: 1,
  },
}

export const HeavyBlur = {
  args: {
    shapes: 3,
    blurMin: 0,
    blurMax: 40,
    color: '#5227FF',
    speed: 1,
  },
}

export const Fast = {
  args: {
    shapes: 3,
    blurMin: 0,
    blurMax: 20,
    color: '#5227FF',
    speed: 2,
  },
}

export const SingleShape = {
  args: {
    shapes: 1,
    blurMin: 0,
    blurMax: 20,
    color: '#5227FF',
    speed: 1,
  },
}
