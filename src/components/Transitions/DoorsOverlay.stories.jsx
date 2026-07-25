import { DoorsOverlay } from './CurtainsNew'

const page = (bg, label) => (
  <div style={{ background: bg, width: '100%', aspectRatio: '19/6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontWeight: 600 }}>{label}</div>
)

const meta = {
  component: DoorsOverlay,
  tags: ['autodocs'],
  argTypes: {
    duration: { control: { type: 'range', min: 200, max: 1500, step: 50 }, description: 'Duration in ms' },
  },
}
export default meta

export const Default = {
  args: {
    pages: [page('#1e3a5f', 'Section A'), page('#2a5298', 'Section B')],
    duration: 500,
    className: '',
  },
}
