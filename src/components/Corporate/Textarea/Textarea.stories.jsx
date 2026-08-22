import { Textarea } from './Textarea'

const meta = {
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: { placeholder: 'Type your message here.' },
}

export const WithValue = {
  args: { defaultValue: 'Hello world, this is a long message.' },
}

export const Disabled = {
  args: { disabled: true, placeholder: 'Disabled textarea' },
}
