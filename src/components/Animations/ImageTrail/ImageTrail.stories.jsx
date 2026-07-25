import { ImageTrail } from './ImageTrail'

const sampleImages = [
  { src: 'https://picsum.photos/100/100?random=1', alt: 'Random 1' },
  { src: 'https://picsum.photos/100/100?random=2', alt: 'Random 2' },
  { src: 'https://picsum.photos/100/100?random=3', alt: 'Random 3' },
  { src: 'https://picsum.photos/100/100?random=4', alt: 'Random 4' },
]

const meta = {
  component: ImageTrail,
  tags: ['autodocs'],
  argTypes: {
    trailLength: { control: { type: 'range', min: 2, max: 30, step: 1 } },
    spacing: { control: { type: 'range', min: 5, max: 100, step: 5 } },
    size: { control: { type: 'range', min: 30, max: 200, step: 10 } },
    fadeAmount: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
}

export default meta

export const Default = {
  args: {
    images: sampleImages,
    trailLength: 8,
    spacing: 30,
    size: 100,
    fadeAmount: 0.3,
  },
}

export const LongTrail = {
  args: {
    images: sampleImages,
    trailLength: 20,
    spacing: 30,
    size: 80,
    fadeAmount: 0.15,
  },
}

export const SmallImages = {
  args: {
    images: sampleImages,
    trailLength: 8,
    spacing: 30,
    size: 50,
    fadeAmount: 0.3,
  },
}

export const Fast = {
  args: {
    images: sampleImages,
    trailLength: 8,
    spacing: 10,
    size: 80,
    fadeAmount: 0.4,
  },
}
