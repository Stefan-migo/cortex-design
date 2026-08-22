import { Avatar } from './Avatar'

const meta = {
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    initials: { control: 'text' },
  },
}

export default meta

export const Default = {
  args: { initials: 'JD', alt: 'Jordan Doyle' },
}

export const WithImage = {
  args: {
    src: 'https://i.pravatar.cc/120',
    alt: 'Jordan Doyle',
  },
}

export const Sizes = {
  render: () => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
      <Avatar initials="SM" style={{ '--corp-size': '2rem' }} />
      <Avatar initials="SM" />
      <Avatar initials="SM" style={{ '--corp-size': '3.5rem' }} />
    </span>
  ),
}
