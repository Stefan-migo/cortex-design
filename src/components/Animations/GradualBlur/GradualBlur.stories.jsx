import { GradualBlur } from './GradualBlur'

const meta = {
  component: GradualBlur,
  tags: ['autodocs'],
  argTypes: {
    blurAmount: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    threshold: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    children: { control: 'text' },
  },
}

export default meta

const content = (
  <div style={{ padding: '2em', background: '#1a1a2e', color: '#fff', maxWidth: 400 }}>
    <h2>Scroll to reveal</h2>
    <p style={{ marginTop: '1em', lineHeight: 1.6 }}>
      This content starts blurred and becomes clear as you scroll it into view.
    </p>
  </div>
)

export const Default = {
  args: {
    children: content,
    blurAmount: 8,
    threshold: 0.2,
  },
}

export const HeavyBlur = {
  args: {
    children: content,
    blurAmount: 20,
    threshold: 0.2,
  },
}

export const QuickTransition = {
  args: {
    children: content,
    blurAmount: 8,
    threshold: 0.5,
  },
}
