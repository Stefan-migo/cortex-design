import { CursorGrid } from './CursorGrid'

const meta = {
  component: CursorGrid,
  tags: ['autodocs'],
  argTypes: {
    rows: { control: { type: 'number', min: 10, max: 100, step: 5 } },
    cols: { control: { type: 'number', min: 10, max: 100, step: 5 } },
    cellSize: { control: { type: 'number', min: 4, max: 64, step: 2 } },
    color: { control: 'color' },
  },
}

export default meta

export const Default = {
  args: {
    rows: 40,
    cols: 60,
    cellSize: 16,
    color: '#5227FF',
  },
}

export const SmallGrid = {
  args: {
    rows: 20,
    cols: 30,
    cellSize: 16,
    color: '#5227FF',
  },
}

export const LargeCells = {
  args: {
    rows: 20,
    cols: 30,
    cellSize: 32,
    color: '#5227FF',
  },
}

export const DifferentColor = {
  args: {
    rows: 40,
    cols: 60,
    cellSize: 16,
    color: '#ff6b35',
  },
}
