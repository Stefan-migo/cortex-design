import { CardNav } from './CardNav'

const sampleItems = [
  {
    label: 'Products',
    bgColor: '#f3f0ff',
    textColor: '#1a1a2e',
    links: [
      { label: 'Design System', href: '#', ariaLabel: 'Design System' },
      { label: 'Components', href: '#', ariaLabel: 'Components' },
    ],
  },
  {
    label: 'Resources',
    bgColor: '#fff7ed',
    textColor: '#1a1a2e',
    links: [
      { label: 'Documentation', href: '#', ariaLabel: 'Documentation' },
      { label: 'Tutorials', href: '#', ariaLabel: 'Tutorials' },
      { label: 'API Reference', href: '#', ariaLabel: 'API Reference' },
    ],
  },
  {
    label: 'Company',
    bgColor: '#f0fdf4',
    textColor: '#1a1a2e',
    links: [
      { label: 'About', href: '#', ariaLabel: 'About' },
      { label: 'Blog', href: '#', ariaLabel: 'Blog' },
    ],
  },
]

const meta = {
  component: CardNav,
  tags: ['autodocs'],
  argTypes: {
    logo: { control: 'text' },
    logoAlt: { control: 'text' },
    baseColor: { control: 'color' },
    menuColor: { control: 'color' },
    buttonBgColor: { control: 'color' },
    buttonTextColor: { control: 'color' },
  },
}

export default meta

export const Default = {
  args: {
    logo: 'https://placeholder.pics/svg/100x28/Cortex',
    logoAlt: 'Cortex Logo',
    items: sampleItems,
    baseColor: '#ffffff',
  },
}

export const DarkNav = {
  args: {
    logo: 'https://placeholder.pics/svg/100x28/CORTEX',
    logoAlt: 'Cortex Logo',
    items: sampleItems.map((item) => ({
      ...item,
      bgColor: '#2a2a3e',
      textColor: '#ffffff',
    })),
    baseColor: '#1a1a2e',
    menuColor: '#ffffff',
    buttonBgColor: '#6366f1',
    buttonTextColor: '#ffffff',
  },
}

export const TwoCards = {
  args: {
    logo: 'https://placeholder.pics/svg/100x28/Cortex',
    logoAlt: 'Cortex Logo',
    items: sampleItems.slice(0, 2),
    baseColor: '#ffffff',
  },
}

export const Minimal = {
  args: {
    logo: 'https://placeholder.pics/svg/100x28/C',
    logoAlt: 'C Logo',
    items: sampleItems,
    baseColor: '#fafafa',
    buttonBgColor: '#000000',
    buttonTextColor: '#ffffff',
  },
}
