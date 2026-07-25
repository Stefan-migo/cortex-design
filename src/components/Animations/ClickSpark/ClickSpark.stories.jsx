import { ClickSpark } from './ClickSpark'

const meta = {
  component: ClickSpark,
  tags: ['autodocs'],
  argTypes: {
    sparkColor: { control: 'color' },
    sparkSize: { control: { type: 'range', min: 2, max: 30, step: 1 } },
    sparkRadius: { control: { type: 'range', min: 5, max: 60, step: 5 } },
    sparkCount: { control: { type: 'range', min: 2, max: 30, step: 1 } },
    duration: { control: { type: 'range', min: 100, max: 1000, step: 50 } },
    children: { control: 'text' },
  },
}

export default meta

export const Default = {
  args: {
    children: <div style={{ padding: '3em 5em', background: '#1a1a2e', color: '#fff', borderRadius: 8, userSelect: 'none' }}>Click me</div>,
    sparkColor: '#ffffff',
    sparkSize: 10,
    sparkRadius: 15,
    sparkCount: 8,
    duration: 400,
  },
}

export const ManySparks = {
  args: {
    children: <div style={{ padding: '3em 5em', background: '#1a1a2e', color: '#fff', borderRadius: 8, userSelect: 'none' }}>Many Sparks</div>,
    sparkColor: '#ffffff',
    sparkSize: 10,
    sparkRadius: 15,
    sparkCount: 20,
    duration: 400,
  },
}

export const Large = {
  args: {
    children: <div style={{ padding: '3em 5em', background: '#1a1a2e', color: '#fff', borderRadius: 8, userSelect: 'none' }}>Large Sparks</div>,
    sparkColor: '#ffffff',
    sparkSize: 30,
    sparkRadius: 30,
    sparkCount: 8,
    duration: 500,
  },
}

export const DifferentColor = {
  args: {
    children: <div style={{ padding: '3em 5em', background: '#1a1a2e', color: '#fff', borderRadius: 8, userSelect: 'none' }}>Gold Sparks</div>,
    sparkColor: '#ffd700',
    sparkSize: 10,
    sparkRadius: 15,
    sparkCount: 8,
    duration: 400,
  },
}
