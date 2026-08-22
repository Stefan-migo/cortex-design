import { Label } from './Label'

const meta = {
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    htmlFor: { control: 'text' },
    children: { control: 'text' },
  },
}

export default meta

export const Default = {
  args: { htmlFor: 'email', children: 'Email address' },
}

export const WithInput = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Label htmlFor="email" {...args}>
        Email
      </Label>
      <input id="email" type="email" />
    </div>
  ),
}

export const Required = {
  args: { htmlFor: 'name', children: 'Full name', 'data-required': true },
}
