import { Badge } from './Badge'

const meta = {
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'destructive'],
    },
    children: { control: 'text' },
  },
}

export default meta

export const Default = {
  args: { children: 'Badge' },
}

export const Secondary = {
  args: { children: 'Secondary', variant: 'secondary' },
}

export const Outline = {
  args: { children: 'Outline', variant: 'outline' },
}

export const Destructive = {
  args: { children: 'Destructive', variant: 'destructive' },
}
