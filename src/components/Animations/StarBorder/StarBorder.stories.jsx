import { StarBorder } from './StarBorder'

const meta = {
  component: StarBorder,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    as: { control: 'select', options: ['button', 'div'] },
    color: { control: 'color' },
    speed: { control: { type: 'range', min: 1, max: 20, step: 1 } },
    thickness: { control: { type: 'range', min: 1, max: 8, step: 1 } },
  },
}

export default meta

export const Default = {
  args: {
    children: 'Hover me',
    color: '#6366f1',
    speed: 6,
    thickness: 2,
    as: 'button',
  },
}

export const Blue = {
  args: {
    children: 'Blue Glow',
    color: '#3b82f6',
    speed: 6,
    thickness: 2,
    as: 'button',
  },
}

export const Fast = {
  args: {
    children: 'Fast Spin',
    color: '#6366f1',
    speed: 2,
    thickness: 2,
    as: 'button',
  },
}

export const Thick = {
  args: {
    children: 'Thick Border',
    color: '#6366f1',
    speed: 6,
    thickness: 4,
    as: 'button',
  },
}

export const AsDiv = {
  args: {
    children: <div style={{ padding: '1em 2em' }}>I am a div</div>,
    color: '#6366f1',
    speed: 6,
    thickness: 2,
    as: 'div',
  },
}
