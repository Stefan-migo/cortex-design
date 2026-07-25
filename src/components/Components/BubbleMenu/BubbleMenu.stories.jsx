import { BubbleMenu } from './BubbleMenu'

const meta = {
  component: BubbleMenu,
  tags: ['autodocs'],
  argTypes: {
    menuBg: { control: 'color' },
    menuContentColor: { control: 'color' },
    useFixedPosition: { control: 'toggle' },
    animationDuration: { control: { type: 'range', min: 0.1, max: 1.5, step: 0.1 } },
    staggerDelay: { control: { type: 'range', min: 0.02, max: 0.3, step: 0.01 } },
  },
}

export default meta

const SampleLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
)

export const Default = {
  args: {
    logo: <SampleLogo />,
    menuBg: '#ffffff',
    menuContentColor: '#111111',
    useFixedPosition: true,
  },
}

export const DarkMode = {
  args: {
    logo: <span style={{ color: '#fff', fontWeight: 'bold' }}>CORTEX</span>,
    menuBg: '#1a1a2e',
    menuContentColor: '#ffffff',
    useFixedPosition: true,
  },
}

export const CustomItems = {
  args: {
    logo: <SampleLogo />,
    menuBg: '#ffffff',
    menuContentColor: '#111111',
    useFixedPosition: true,
    items: [
      { label: 'features', href: '#', ariaLabel: 'Features', rotation: -6, hoverStyles: { bgColor: '#6366f1', textColor: '#fff' } },
      { label: 'pricing', href: '#', ariaLabel: 'Pricing', rotation: 6, hoverStyles: { bgColor: '#ec4899', textColor: '#fff' } },
      { label: 'docs', href: '#', ariaLabel: 'Documentation', rotation: 0, hoverStyles: { bgColor: '#14b8a6', textColor: '#fff' } },
    ],
  },
}

export const FastAnimation = {
  args: {
    logo: <SampleLogo />,
    menuBg: '#ffffff',
    menuContentColor: '#111111',
    useFixedPosition: true,
    animationDuration: 0.3,
    staggerDelay: 0.05,
  },
}
