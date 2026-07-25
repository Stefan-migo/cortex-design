import { CircularGallery } from './CircularGallery'

const meta = {
  component: CircularGallery,
  tags: ['autodocs'],
  argTypes: {
    bend: { control: { type: 'range', min: -8, max: 8, step: 0.5 } },
    textColor: { control: 'color' },
    borderRadius: { control: { type: 'range', min: 0, max: 0.5, step: 0.01 } },
    scrollSpeed: { control: { type: 'range', min: 0.5, max: 8, step: 0.5 } },
    scrollEase: { control: { type: 'range', min: 0.01, max: 0.2, step: 0.01 } },
  },
}

export default meta

export const Default = {
  args: {
    bend: 3,
    textColor: '#ffffff',
    borderRadius: 0.05,
    scrollSpeed: 2,
    scrollEase: 0.05,
  },
}

export const SubtleBend = {
  args: {
    bend: 1,
    textColor: '#ffffff',
    borderRadius: 0.05,
    scrollSpeed: 2,
    scrollEase: 0.05,
  },
}

export const HighBend = {
  args: {
    bend: 6,
    textColor: '#ffffff',
    borderRadius: 0.08,
    scrollSpeed: 1.5,
    scrollEase: 0.08,
  },
}

export const DarkText = {
  args: {
    bend: 3,
    textColor: '#333333',
    borderRadius: 0.02,
    scrollSpeed: 3,
    scrollEase: 0.04,
  },
}

export const CustomImages = {
  args: {
    bend: 2,
    textColor: '#ffffff',
    borderRadius: 0.05,
    scrollSpeed: 2,
    scrollEase: 0.05,
    items: [
      { image: 'https://picsum.photos/seed/a/800/600', text: 'Mountains' },
      { image: 'https://picsum.photos/seed/b/800/600', text: 'Forest' },
      { image: 'https://picsum.photos/seed/c/800/600', text: 'Ocean' },
      { image: 'https://picsum.photos/seed/d/800/600', text: 'Sunset' },
      { image: 'https://picsum.photos/seed/e/800/600', text: 'City' },
    ],
  },
}
