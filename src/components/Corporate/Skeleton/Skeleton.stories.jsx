import { Skeleton } from './Skeleton'

const meta = {
  component: Skeleton,
  tags: ['autodocs'],
}

export default meta

export const Default = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Skeleton style={{ height: '12px', width: '100%' }} />
      <Skeleton style={{ height: '12px', width: '80%' }} />
      <Skeleton style={{ height: '140px', width: '100%' }} />
    </div>
  ),
}

export const Circle = {
  render: () => <Skeleton style={{ height: '64px', width: '64px', borderRadius: '50%' }} />,
}

export const TextLines = {
  render: () => (
    <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Skeleton style={{ height: '14px', width: '60%' }} />
      <Skeleton style={{ height: '12px', width: '100%' }} />
      <Skeleton style={{ height: '12px', width: '90%' }} />
      <Skeleton style={{ height: '12px', width: '70%' }} />
    </div>
  ),
}
