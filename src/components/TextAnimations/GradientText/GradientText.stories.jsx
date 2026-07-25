import { GradientText } from './GradientText'

const meta = {
  component: GradientText,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    colors: { control: 'object' },
    animationSpeed: { control: { type: 'range', min: 1, max: 8, step: 1 } },
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
    pauseOnHover: { control: 'boolean' },
    yoyo: { control: 'boolean' },
    showBorder: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: {
    children: 'Gradient Text',
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
    animationSpeed: 3,
    direction: 'horizontal',
    pauseOnHover: false,
    yoyo: false,
    showBorder: false,
  },
}

export const Vertical = {
  args: {
    children: 'Vertical',
    colors: ['#a18cd1', '#fbc2eb', '#f6d365'],
    animationSpeed: 3,
    direction: 'vertical',
    pauseOnHover: false,
    yoyo: false,
    showBorder: false,
  },
}

export const Fast = {
  args: {
    children: 'Fast',
    colors: ['#ff9a9e', '#fad0c4', '#ffecd2'],
    animationSpeed: 1,
    direction: 'horizontal',
    pauseOnHover: false,
    yoyo: false,
    showBorder: false,
  },
}

export const Yoyo = {
  args: {
    children: 'Back and Forth',
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
    animationSpeed: 3,
    direction: 'horizontal',
    pauseOnHover: false,
    yoyo: true,
    showBorder: false,
  },
}

export const PauseOnHover = {
  args: {
    children: 'Hover to pause',
    colors: ['#f093fb', '#f5576c', '#4facfe'],
    animationSpeed: 2,
    direction: 'horizontal',
    pauseOnHover: true,
    yoyo: false,
    showBorder: false,
  },
}

export const WithBorder = {
  args: {
    children: 'Bordered',
    colors: ['#43e97b', '#38f9d7', '#4facfe'],
    animationSpeed: 3,
    direction: 'horizontal',
    pauseOnHover: false,
    yoyo: false,
    showBorder: true,
  },
}
