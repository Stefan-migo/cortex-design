import { MagnetLines } from './MagnetLines'

const meta = {
  component: MagnetLines,
  decorators: [
    (Story) => <div style={{ width: 400, height: 300, background: '#111' }}><Story /></div>,
  ],
  tags: ['autodocs'],
  argTypes: {
    lines: { control: { type: 'range', min: 10, max: 200, step: 5 } },
    length: { control: { type: 'range', min: 10, max: 200, step: 5 } },
    color: { control: 'color' },
    gap: { control: { type: 'range', min: 5, max: 50, step: 5 } },
  },
}

export default meta

export const Default = {
  args: {
    lines: 50,
    length: 100,
    color: '#6366f1',
    gap: 20,
  },
}

export const ManyLines = {
  args: {
    lines: 150,
    length: 100,
    color: '#6366f1',
    gap: 15,
  },
}

export const ShortLines = {
  args: {
    lines: 50,
    length: 40,
    color: '#6366f1',
    gap: 20,
  },
}

export const SlowRotation = {
  args: {
    lines: 50,
    length: 100,
    color: '#6366f1',
    gap: 20,
  },
}
