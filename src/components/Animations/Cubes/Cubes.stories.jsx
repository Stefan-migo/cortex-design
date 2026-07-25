import { Cubes } from './Cubes'

const meta = {
  component: Cubes,
  tags: ['autodocs'],
  argTypes: {
    rows: { control: { type: 'range', min: 1, max: 15, step: 1 } },
    cols: { control: { type: 'range', min: 1, max: 15, step: 1 } },
    size: { control: { type: 'range', min: 20, max: 150, step: 10 } },
    gap: { control: { type: 'range', min: 0, max: 40, step: 2 } },
    color1: { control: 'color' },
    color2: { control: 'color' },
  },
}

export default meta

export const Default = {
  args: {
    rows: 5,
    cols: 5,
    size: 60,
    gap: 10,
    color1: '#5227FF',
    color2: '#FF6B6B',
  },
}

export const LargeGrid = {
  args: {
    rows: 10,
    cols: 10,
    size: 40,
    gap: 6,
    color1: '#5227FF',
    color2: '#FF6B6B',
  },
}

export const BigCubes = {
  args: {
    rows: 3,
    cols: 3,
    size: 120,
    gap: 16,
    color1: '#5227FF',
    color2: '#FF6B6B',
  },
}

export const Monochrome = {
  args: {
    rows: 5,
    cols: 5,
    size: 60,
    gap: 10,
    color1: '#3A3A5C',
    color2: '#2A2A4A',
  },
}
