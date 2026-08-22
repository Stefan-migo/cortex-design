import { Input } from './Input'

const meta = {
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: { placeholder: 'Enter your email' },
}

export const WithValue = {
  args: { defaultValue: 'hello@example.com' },
}

export const Password = {
  args: { type: 'password', placeholder: '••••••••' },
}

export const Disabled = {
  args: { disabled: true, placeholder: 'Disabled input' },
}
