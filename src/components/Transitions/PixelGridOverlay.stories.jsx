import { PixelGridOverlay } from './CurtainsNew'

const page = (bg, label) => (
  <div style={{ background: bg, width: '100%', aspectRatio: '19/6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontWeight: 600 }}>{label}</div>
)

const meta = {
  component: PixelGridOverlay,
  tags: ['autodocs'],
  argTypes: {
    duration: { control: { type: 'range', min: 300, max: 2000, step: 50 }, description: 'Duration in ms' },
    size: { control: { type: 'range', min: 4, max: 16, step: 1 }, description: 'Grid size (n×n)' },
  },
}
export default meta

export const Default = {
  args: {
    pages: [page('#1e1e4a', 'Section A'), page('#2e1a6e', 'Section B')],
    duration: 600,
    size: 10,
    className: '',
  },
}
