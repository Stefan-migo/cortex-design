import { ShutterSlats } from './CurtainsNew'

const page = (bg, label) => (
  <div style={{ background: bg, width: '100%', aspectRatio: '19/6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontWeight: 600 }}>{label}</div>
)

const meta = {
  component: ShutterSlats,
  tags: ['autodocs'],
  argTypes: {
    duration: { control: { type: 'range', min: 200, max: 1500, step: 50 }, description: 'Duration in ms' },
    slats: { control: { type: 'range', min: 3, max: 12, step: 1 }, description: 'Number of slats' },
  },
}
export default meta

export const Default = {
  args: {
    pages: [page('#3d2a0a', 'Section A'), page('#5c3d1a', 'Section B')],
    duration: 500,
    slats: 5,
    className: '',
  },
}
