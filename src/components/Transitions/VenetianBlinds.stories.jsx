import { VenetianBlinds } from './VenetianBlinds'

const sectionA = (
  <div style={{ background: '#0f4c5c', width: '100%', aspectRatio: '19/6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontWeight: 600 }}>
    Section A
  </div>
)
const sectionB = (
  <div style={{ background: '#1a6b7a', width: '100%', aspectRatio: '19/6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontWeight: 600 }}>
    Section B
  </div>
)

const meta = {
  component: VenetianBlinds,
  tags: ['autodocs'],
  argTypes: {
    duration: {
      control: { type: 'range', min: 200, max: 2000, step: 50 },
      description: 'Total animation duration in ms',
    },
    easing: {
      control: 'select',
      options: ['ease-out', 'ease-in', 'ease-in-out',
        'cubic-bezier(0.25,1,0.5,1)', 'cubic-bezier(0.4,0,0.2,1)',
        'cubic-bezier(0.32,0.72,0,1)'],
      description: 'Animation easing curve',
    },
    strips: {
      control: { type: 'range', min: 4, max: 24, step: 1 },
      description: 'Number of horizontal strips',
    },
  },
}

export default meta

export const Default = {
  args: {
    pages: [sectionA, sectionB],
    duration: 650,
    easing: 'cubic-bezier(0.32,0.72,0,1)',
    strips: 12,
    className: '',
  },
}
