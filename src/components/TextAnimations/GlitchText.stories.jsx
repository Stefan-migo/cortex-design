import { GlitchText } from './GlitchText'

const meta = {
  component: GlitchText,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    speed: { control: { type: 'range', min: 0.1, max: 2, step: 0.1 } },
    enableShadows: { control: 'boolean' },
    enableOnHover: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: { children: 'Glitch Effect', speed: 0.5, enableShadows: true, enableOnHover: false },
}

export const HoverOnly = {
  args: { children: 'Hover me', speed: 1, enableShadows: true, enableOnHover: true },
}

export const SlowMotion = {
  args: { children: 'Slow...', speed: 0.1, enableShadows: true, enableOnHover: false },
}

export const NoShadows = {
  args: { children: 'No shadows', speed: 0.5, enableShadows: false, enableOnHover: false },
}
