import { Magnet } from './Magnet'

const meta = {
  component: Magnet,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    padding: { control: { type: 'range', min: 20, max: 300, step: 10 } },
    magnetStrength: { control: { type: 'range', min: 0.1, max: 10, step: 0.1 } },
    disabled: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: {
    children: <div style={{ padding: '2em 3em', background: '#6366f1', color: '#fff', borderRadius: 8, cursor: 'pointer' }}>Move mouse around me</div>,
    padding: 100,
    magnetStrength: 2,
    disabled: false,
  },
}

export const Strong = {
  args: {
    children: <div style={{ padding: '2em 3em', background: '#6366f1', color: '#fff', borderRadius: 8, cursor: 'pointer' }}>Strong Pull</div>,
    padding: 100,
    magnetStrength: 5,
    disabled: false,
  },
}

export const Weak = {
  args: {
    children: <div style={{ padding: '2em 3em', background: '#6366f1', color: '#fff', borderRadius: 8, cursor: 'pointer' }}>Weak Pull</div>,
    padding: 100,
    magnetStrength: 0.5,
    disabled: false,
  },
}

export const Disabled = {
  args: {
    children: <div style={{ padding: '2em 3em', background: '#6366f1', color: '#fff', borderRadius: 8, cursor: 'pointer' }}>No Movement</div>,
    padding: 100,
    magnetStrength: 2,
    disabled: true,
  },
}
