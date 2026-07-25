import { ChromaGrid } from './ChromaGrid'

const meta = {
  component: ChromaGrid,
  tags: ['autodocs'],
  argTypes: {
    radius: { control: { type: 'range', min: 50, max: 600, step: 10 } },
    columns: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    rows: { control: { type: 'range', min: 1, max: 4, step: 1 } },
    damping: { control: { type: 'range', min: 0.1, max: 1, step: 0.05 } },
    fadeOut: { control: { type: 'range', min: 0.1, max: 3, step: 0.1 } },
  },
}

export default meta

export const Default = {
  args: {
    radius: 300,
    columns: 3,
    rows: 2,
    damping: 0.45,
    fadeOut: 0.6,
  },
}

export const SmallSpotlight = {
  args: {
    radius: 120,
    columns: 3,
    rows: 2,
    damping: 0.3,
    fadeOut: 0.4,
  },
}

export const SingleRow = {
  args: {
    radius: 300,
    columns: 3,
    rows: 1,
    damping: 0.5,
    fadeOut: 0.6,
  },
}

export const WideGrid = {
  args: {
    radius: 400,
    columns: 4,
    rows: 2,
    damping: 0.6,
    fadeOut: 0.8,
    items: [
      { image: 'https://i.pravatar.cc/300?img=8', title: 'Alex Rivera', subtitle: 'Full Stack', handle: '@alex', borderColor: '#4F46E5', gradient: 'linear-gradient(145deg, #4F46E5, #000)' },
      { image: 'https://i.pravatar.cc/300?img=11', title: 'Jordan Chen', subtitle: 'DevOps', handle: '@jordan', borderColor: '#10B981', gradient: 'linear-gradient(210deg, #10B981, #000)' },
      { image: 'https://i.pravatar.cc/300?img=3', title: 'Morgan Blake', subtitle: 'Designer', handle: '@morgan', borderColor: '#F59E0B', gradient: 'linear-gradient(165deg, #F59E0B, #000)' },
      { image: 'https://i.pravatar.cc/300?img=16', title: 'Casey Park', subtitle: 'Data Sci', handle: '@casey', borderColor: '#EF4444', gradient: 'linear-gradient(195deg, #EF4444, #000)' },
      { image: 'https://i.pravatar.cc/300?img=25', title: 'Sam Kim', subtitle: 'Mobile Dev', handle: '@sam', borderColor: '#8B5CF6', gradient: 'linear-gradient(225deg, #8B5CF6, #000)' },
      { image: 'https://i.pravatar.cc/300?img=60', title: 'Tyler Rodriguez', subtitle: 'Cloud Arch', handle: '@tyler', borderColor: '#06B6D4', gradient: 'linear-gradient(135deg, #06B6D4, #000)' },
    ],
  },
}
