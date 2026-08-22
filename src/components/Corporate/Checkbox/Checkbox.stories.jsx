import { Checkbox } from './Checkbox'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  render: (args) => (
    <Checkbox
      aria-label="Accept terms"
      checked={args.checked}
      onChange={args.onChange}
    />
  ),
  args: { checked: false },
}

export const Checked = {
  render: (args) => (
    <Checkbox
      aria-label="Accept terms"
      checked={true}
      onChange={args.onChange}
    />
  ),
}

export const Disabled = {
  render: (args) => (
    <Checkbox
      aria-label="Accept terms"
      checked={false}
      disabled
      onChange={args.onChange}
    />
  ),
}
