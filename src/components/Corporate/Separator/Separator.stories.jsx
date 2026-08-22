import { Separator } from './Separator'

const meta = {
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
}

export default meta

export const Default = {
  args: {},
}

export const Vertical = {
  render: () => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', height: '3rem' }}>
      Left <Separator orientation="vertical" /> Right
    </span>
  ),
}

export const WithLabel = {
  render: () => (
    <div>
      <div>Section one</div>
      <Separator />
      <div>Section two</div>
    </div>
  ),
}
