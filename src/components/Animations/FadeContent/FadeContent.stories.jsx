import { FadeContent } from './FadeContent'

const meta = {
  component: FadeContent,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    duration: { control: { type: 'range', min: 0.1, max: 3, step: 0.1 } },
    delay: { control: { type: 'range', min: 0, max: 1000, step: 50 } },
    threshold: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    translateY: { control: { type: 'range', min: 0, max: 200, step: 10 } },
  },
}

export default meta

export const Default = {
  args: {
    children: <div style={{ padding: '2em', background: '#1a1a2e', color: '#fff', borderRadius: 8 }}>Fade In Content</div>,
    duration: 0.5,
    delay: 0,
    threshold: 0,
    translateY: 20,
  },
}

export const Slow = {
  args: {
    children: <div style={{ padding: '2em', background: '#1a1a2e', color: '#fff', borderRadius: 8 }}>Slow Fade</div>,
    duration: 2,
    delay: 0,
    threshold: 0,
    translateY: 20,
  },
}

export const Delayed = {
  args: {
    children: <div style={{ padding: '2em', background: '#1a1a2e', color: '#fff', borderRadius: 8 }}>Delayed Entry</div>,
    duration: 0.5,
    delay: 500,
    threshold: 0,
    translateY: 20,
  },
}

export const BottomFade = {
  args: {
    children: <div style={{ padding: '2em', background: '#1a1a2e', color: '#fff', borderRadius: 8 }}>From Far Below</div>,
    duration: 0.5,
    delay: 0,
    threshold: 0,
    translateY: 80,
  },
}
