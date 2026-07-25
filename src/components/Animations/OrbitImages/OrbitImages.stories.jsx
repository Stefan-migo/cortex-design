import { OrbitImages } from './OrbitImages'

const meta = {
  component: OrbitImages,
  tags: ['autodocs'],
  argTypes: {
    orbitRadius: { control: { type: 'range', min: 50, max: 300, step: 10 } },
    speed: { control: { type: 'range', min: 1, max: 10, step: 1 } },
  },
}

export default meta

const demoImages = [
  { src: 'https://picsum.photos/seed/a/48', alt: 'Image A' },
  { src: 'https://picsum.photos/seed/b/48', alt: 'Image B' },
  { src: 'https://picsum.photos/seed/c/48', alt: 'Image C' },
  { src: 'https://picsum.photos/seed/d/48', alt: 'Image D' },
]

const sixImages = [
  { src: 'https://picsum.photos/seed/1/48', alt: 'One' },
  { src: 'https://picsum.photos/seed/2/48', alt: 'Two' },
  { src: 'https://picsum.photos/seed/3/48', alt: 'Three' },
  { src: 'https://picsum.photos/seed/4/48', alt: 'Four' },
  { src: 'https://picsum.photos/seed/5/48', alt: 'Five' },
  { src: 'https://picsum.photos/seed/6/48', alt: 'Six' },
]

export const Default = {
  args: {
    images: demoImages,
    orbitRadius: 150,
    speed: 4,
  },
}

export const SpeedUp = {
  args: {
    images: demoImages,
    orbitRadius: 150,
    speed: 2,
  },
}

export const LargerOrbit = {
  args: {
    images: demoImages,
    orbitRadius: 250,
    speed: 4,
  },
}

export const SixImages = {
  args: {
    images: sixImages,
    orbitRadius: 150,
    speed: 4,
  },
}
