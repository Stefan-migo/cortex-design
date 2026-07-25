import { Counter } from './Counter'

const meta = {
  component: Counter,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 999999, step: 1 } },
    fontSize: { control: { type: 'range', min: 20, max: 200, step: 10 } },
    gap: { control: { type: 'range', min: 0, max: 40, step: 2 } },
    borderRadius: { control: { type: 'range', min: 0, max: 20, step: 1 } },
    horizontalPadding: { control: { type: 'range', min: 0, max: 40, step: 2 } },
    textColor: { control: 'color' },
    fontWeight: { control: { type: 'range', min: 100, max: 900, step: 100 } },
    gradientHeight: { control: { type: 'range', min: 0, max: 60, step: 2 } },
    gradientFrom: { control: 'color' },
    gradientTo: { control: 'color' },
  },
}

export default meta

export const Default = {
  args: {
    value: 12345,
    fontSize: 100,
    gap: 8,
    borderRadius: 4,
    horizontalPadding: 8,
    textColor: '#ffffff',
    gradientHeight: 16,
    gradientFrom: '#000000',
    gradientTo: 'transparent',
  },
}

export const Small = {
  args: {
    value: 42,
    fontSize: 48,
    gap: 4,
    borderRadius: 4,
    horizontalPadding: 8,
    textColor: '#ffffff',
    gradientHeight: 8,
    gradientFrom: '#000000',
    gradientTo: 'transparent',
  },
}

export const Decimal = {
  args: {
    value: 3.14159,
    fontSize: 80,
    gap: 6,
    borderRadius: 4,
    horizontalPadding: 8,
    textColor: '#10b981',
    gradientHeight: 12,
    gradientFrom: '#000000',
    gradientTo: 'transparent',
  },
}

export const LargeBold = {
  args: {
    value: 99999,
    fontSize: 160,
    gap: 12,
    borderRadius: 8,
    horizontalPadding: 16,
    textColor: '#f59e0b',
    fontWeight: 900,
    gradientHeight: 24,
    gradientFrom: '#000000',
    gradientTo: 'transparent',
  },
}

export const NoGradients = {
  args: {
    value: 2024,
    fontSize: 72,
    gap: 8,
    borderRadius: 4,
    horizontalPadding: 8,
    textColor: '#ffffff',
    gradientHeight: 0,
    gradientFrom: 'transparent',
    gradientTo: 'transparent',
    containerStyle: { background: '#1a1a2e', padding: '8px 16px', borderRadius: '8px' },
  },
}
