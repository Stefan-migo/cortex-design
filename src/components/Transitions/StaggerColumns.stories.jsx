import { StaggerColumns } from './CurtainsNew'

const page = (bg, label) => (
  <div style={{ background: bg, width: '100%', aspectRatio: '19/6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontWeight: 600 }}>{label}</div>
)

const meta = {
  component: StaggerColumns,
  tags: ['autodocs'],
  argTypes: {
    duration: { control: { type: 'range', min: 200, max: 1500, step: 50 }, description: 'Duration in ms' },
    columns: { control: { type: 'range', min: 3, max: 10, step: 1 }, description: 'Number of columns' },
  },
}
export default meta

export const Default = {
  args: {
    pages: [page('#5c0e1a', 'Section A'), page('#8b1a2b', 'Section B')],
    duration: 500,
    columns: 5,
    className: '',
  },
}
