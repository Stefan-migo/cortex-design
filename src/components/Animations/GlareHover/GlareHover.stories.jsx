import { GlareHover } from './GlareHover'

const meta = {
  component: GlareHover,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    background: { control: 'color' },
    borderRadius: { control: 'text' },
    glareColor: { control: 'color' },
    glareOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    glareSize: { control: { type: 'range', min: 50, max: 800, step: 10 } },
    playOnce: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: {
    children: <div style={{ padding: '3em 5em', color: '#fff', textAlign: 'center' }}>Glare Card</div>,
    width: '300px',
    height: '200px',
    background: '#1a1a2e',
    borderRadius: '12px',
    glareColor: '#ffffff',
    glareOpacity: 0.3,
    glareSize: 300,
    playOnce: false,
  },
}

export const CustomGlare = {
  args: {
    children: <div style={{ padding: '3em 5em', color: '#fff', textAlign: 'center' }}>Blue Glare</div>,
    width: '300px',
    height: '200px',
    background: '#1a1a2e',
    borderRadius: '12px',
    glareColor: '#3b82f6',
    glareOpacity: 0.4,
    glareSize: 300,
    playOnce: false,
  },
}

export const LargeGlare = {
  args: {
    children: <div style={{ padding: '3em 5em', color: '#fff', textAlign: 'center' }}>Large Glare</div>,
    width: '300px',
    height: '200px',
    background: '#1a1a2e',
    borderRadius: '12px',
    glareColor: '#ffffff',
    glareOpacity: 0.5,
    glareSize: 600,
    playOnce: false,
  },
}

export const PlayOnce = {
  args: {
    children: <div style={{ padding: '3em 5em', color: '#fff', textAlign: 'center' }}>One Flash</div>,
    width: '300px',
    height: '200px',
    background: '#1a1a2e',
    borderRadius: '12px',
    glareColor: '#ffffff',
    glareOpacity: 0.3,
    glareSize: 300,
    playOnce: true,
  },
}
