import { AnimatedList } from './AnimatedList'

const sampleItems = [
  'Welcome to Cortex Design',
  'Scroll-driven animations',
  'Zero external dependencies',
  'IntersectionObserver based',
  'Smooth staggered reveal',
  'Keyboard navigation ready',
  'Customizable gradients',
]

const meta = {
  component: AnimatedList,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    showGradients: { control: 'toggle' },
    enableArrowNavigation: { control: 'toggle' },
    displayScrollbar: { control: 'toggle' },
    initialSelectedIndex: { control: { type: 'range', min: -1, max: 14, step: 1 } },
  },
}

export default meta

export const Default = {
  args: {
    items: sampleItems,
    showGradients: true,
    enableArrowNavigation: true,
    displayScrollbar: true,
  },
}

export const NoGradients = {
  args: {
    items: sampleItems,
    showGradients: false,
    enableArrowNavigation: true,
    displayScrollbar: true,
  },
}

export const HiddenScrollbar = {
  args: {
    items: sampleItems,
    showGradients: true,
    enableArrowNavigation: true,
    displayScrollbar: false,
  },
}

export const ManyItems = {
  args: {
    items: Array.from({ length: 20 }, (_, i) => `List item ${i + 1}`),
    showGradients: true,
    enableArrowNavigation: true,
    displayScrollbar: true,
  },
}
