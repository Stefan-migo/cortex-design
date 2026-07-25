import { BorderGlow } from './BorderGlow'

const meta = {
  component: BorderGlow,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    edgeSensitivity: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    glowColor: { control: 'text' },
    backgroundColor: { control: 'color' },
    borderRadius: { control: { type: 'range', min: 4, max: 60, step: 2 } },
    glowRadius: { control: { type: 'range', min: 10, max: 100, step: 5 } },
    glowIntensity: { control: { type: 'range', min: 0.1, max: 2, step: 0.1 } },
    coneSpread: { control: { type: 'range', min: 5, max: 50, step: 1 } },
    animated: { control: 'toggle' },
    fillOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
  },
}

export default meta

const cardStyle = {
  padding: '48px',
  color: 'white',
  fontSize: '1.25rem',
  textAlign: 'center',
}

export const Default = {
  args: {
    children: <div style={cardStyle}>Hover me — edge glow follows your cursor</div>,
    glowColor: '40 80 80',
    backgroundColor: '#120F17',
    borderRadius: 28,
    glowRadius: 40,
    glowIntensity: 1.0,
    coneSpread: 25,
    fillOpacity: 0.5,
  },
}

export const PurpleGlow = {
  args: {
    children: <div style={cardStyle}>Purple glow variant</div>,
    glowColor: '270 80 70',
    backgroundColor: '#1a1025',
    colors: ['#a855f7', '#d8b4fe', '#7c3aed'],
    borderRadius: 28,
    coneSpread: 20,
    fillOpacity: 0.6,
  },
}

export const AnimatedSweep = {
  args: {
    children: <div style={cardStyle}>Auto-animated sweep — no hover needed</div>,
    animated: true,
    glowIntensity: 1.2,
    coneSpread: 30,
  },
}

export const Subtle = {
  args: {
    children: <div style={cardStyle}>Low intensity, tight cone</div>,
    glowIntensity: 0.4,
    coneSpread: 10,
    fillOpacity: 0.2,
    edgeSensitivity: 50,
  },
}
