import { MetallicPaint } from './MetallicPaint'

const meta = {
  component: MetallicPaint,
  tags: ['autodocs'],
  argTypes: {
    colors: { control: 'object' },
    speed: { control: { type: 'number', min: 1, max: 20, step: 1 } },
    children: { control: 'text' },
  },
}

export default meta

const content = (
  <div style={{ padding: '3em 5em', background: '#1a1a2e', color: '#fff', textAlign: 'center', borderRadius: 12 }}>
    <h2>Metallic Surface</h2>
  </div>
)

export const Default = {
  args: {
    children: content,
    colors: ['#c0c0c0', '#e8e8e8', '#a0a0a0', '#f0f0f0', '#808080', '#d0d0d0'],
    speed: 4,
  },
}

export const Gold = {
  args: {
    children: content,
    colors: ['#b8860b', '#ffd700', '#daa520', '#fff8dc', '#b8860b', '#ffd700'],
    speed: 4,
  },
}

export const Silver = {
  args: {
    children: content,
    colors: ['#c0c0c0', '#f8f8ff', '#a9a9a9', '#e0e0e0', '#808080', '#dcdcdc'],
    speed: 4,
  },
}

export const FastShimmer = {
  args: {
    children: content,
    colors: ['#c0c0c0', '#e8e8e8', '#a0a0a0', '#f0f0f0', '#808080', '#d0d0d0'],
    speed: 1,
  },
}
