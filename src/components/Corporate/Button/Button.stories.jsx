import { Button } from './Button'

const meta = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'ghost', 'secondary', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    children: { control: 'text' },
  },
}

export default meta

export const Default = {
  args: { children: 'Default' },
}

export const Destructive = {
  args: { children: 'Destructive', variant: 'destructive' },
}

export const Outline = {
  args: { children: 'Outline', variant: 'outline' },
}

export const Ghost = {
  args: { children: 'Ghost', variant: 'ghost' },
}

export const Secondary = {
  args: { children: 'Secondary', variant: 'secondary' },
}

export const Link = {
  args: { children: 'Link', variant: 'link' },
}

export const Small = {
  args: { children: 'Small', size: 'sm' },
}

export const Large = {
  args: { children: 'Large', size: 'lg' },
}
