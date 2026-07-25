import { LogoLoop } from './LogoLoop'

const meta = {
  component: LogoLoop,
  tags: ['autodocs'],
  argTypes: {
    speed: { control: { type: 'number', min: 5, max: 60, step: 1 } },
    direction: { control: 'radio', options: ['left', 'right'] },
    items: { control: 'object' },
  },
}

export default meta

const defaultItems = [
  { src: 'https://placehold.co/120x40/1a1a2e/5227FF?text=Logo1', alt: 'Logo 1' },
  { src: 'https://placehold.co/120x40/1a1a2e/5227FF?text=Logo2', alt: 'Logo 2' },
  { src: 'https://placehold.co/120x40/1a1a2e/5227FF?text=Logo3', alt: 'Logo 3' },
  { src: 'https://placehold.co/120x40/1a1a2e/5227FF?text=Logo4', alt: 'Logo 4' },
]

export const Default = {
  args: {
    items: defaultItems,
    speed: 20,
    direction: 'left',
  },
}

export const Fast = {
  args: {
    items: defaultItems,
    speed: 10,
    direction: 'left',
  },
}

export const RightDirection = {
  args: {
    items: defaultItems,
    speed: 20,
    direction: 'right',
  },
}

export const ManyItems = {
  args: {
    items: [
      ...defaultItems,
      { src: 'https://placehold.co/120x40/1a1a2e/5227FF?text=Logo5', alt: 'Logo 5' },
      { src: 'https://placehold.co/120x40/1a1a2e/5227FF?text=Logo6', alt: 'Logo 6' },
    ],
    speed: 25,
    direction: 'left',
  },
}
