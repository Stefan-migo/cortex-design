import { ElectricBorder } from './ElectricBorder'

const meta = {
  component: ElectricBorder,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    speed: { control: { type: 'range', min: 0.1, max: 5, step: 0.1 } },
    chaos: { control: { type: 'range', min: 0.01, max: 0.5, step: 0.01 } },
    borderRadius: { control: { type: 'number', min: 0, max: 100 } },
    children: { control: 'text' },
  },
}

export default meta

const box = (
  <div style={{ padding: '3em 5em', background: '#1a1a2e', color: '#fff', textAlign: 'center' }}>
    Electric Border
  </div>
)

export const Default = {
  args: {
    children: box,
    color: '#5227FF',
    speed: 1,
    chaos: 0.12,
    borderRadius: 24,
  },
}

export const Fast = {
  args: {
    children: box,
    color: '#5227FF',
    speed: 3,
    chaos: 0.12,
    borderRadius: 24,
  },
}

export const HighChaos = {
  args: {
    children: box,
    color: '#5227FF',
    speed: 1,
    chaos: 0.3,
    borderRadius: 24,
  },
}

export const Blue = {
  args: {
    children: box,
    color: '#00bfff',
    speed: 1,
    chaos: 0.12,
    borderRadius: 24,
  },
}
