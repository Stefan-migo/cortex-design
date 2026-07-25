import { Cube3D } from './Cube3D'

const sectionA = (
  <div style={{ background: '#2d1b69', width: '100%', aspectRatio: '19/6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccb', fontSize: '2rem', fontWeight: 600 }}>
    Section A
  </div>
)
const sectionB = (
  <div style={{ background: '#1a0a3e', width: '100%', aspectRatio: '19/6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccb', fontSize: '2rem', fontWeight: 600 }}>
    Section B
  </div>
)

const meta = {
  component: Cube3D,
  tags: ['autodocs'],
  argTypes: {
    duration: {
      control: { type: 'range', min: 100, max: 2000, step: 50 },
      description: 'Animation duration in milliseconds',
    },
    easing: {
      control: 'select',
      options: ['ease-out', 'ease-in', 'ease-in-out', 'linear',
        'cubic-bezier(0.25,1,0.5,1)', 'cubic-bezier(0.4,0,0.2,1)',
        'cubic-bezier(0.16,1,0.3,1)', 'cubic-bezier(0.32,0.72,0,1)',
        'cubic-bezier(0.77,0,0.175,1)', 'cubic-bezier(0.65,0,0.35,1)',
        'cubic-bezier(0.22,1,0.36,1)'],
      description: 'Animation easing curve',
    },
  },
}
export default meta

export const Default = {
  args: {
    pages: [sectionA, sectionB],
    duration: 700,
    easing: 'cubic-bezier(0.645,0.045,0.355,1)',
    className: '',
  },
}
