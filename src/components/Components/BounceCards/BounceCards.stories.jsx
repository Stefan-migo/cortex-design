import { BounceCards } from './BounceCards'

const sampleImages = [
  'https://picsum.photos/seed/card1/400/400',
  'https://picsum.photos/seed/card2/400/400',
  'https://picsum.photos/seed/card3/400/400',
  'https://picsum.photos/seed/card4/400/400',
  'https://picsum.photos/seed/card5/400/400',
]

const meta = {
  component: BounceCards,
  tags: ['autodocs'],
  argTypes: {
    containerWidth: { control: { type: 'range', min: 200, max: 800, step: 10 } },
    containerHeight: { control: { type: 'range', min: 200, max: 800, step: 10 } },
    animationDelay: { control: { type: 'range', min: 0, max: 3, step: 0.1 } },
    animationStagger: { control: { type: 'range', min: 0.01, max: 0.3, step: 0.01 } },
    enableHover: { control: 'toggle' },
  },
}

export default meta

export const Default = {
  args: {
    images: sampleImages,
    containerWidth: 400,
    containerHeight: 400,
    animationDelay: 0.5,
    animationStagger: 0.06,
    enableHover: false,
  },
}

export const WithHover = {
  args: {
    images: sampleImages,
    containerWidth: 400,
    containerHeight: 400,
    animationDelay: 0.3,
    animationStagger: 0.08,
    enableHover: true,
  },
}

export const ThreeCards = {
  args: {
    images: sampleImages.slice(0, 3),
    containerWidth: 400,
    containerHeight: 400,
    animationDelay: 0.5,
    animationStagger: 0.1,
    transformStyles: [
      'rotate(12deg) translate(-120px)',
      'rotate(-3deg)',
      'rotate(-8deg) translate(120px)',
    ],
    enableHover: true,
  },
}

export const FastEntry = {
  args: {
    images: sampleImages,
    containerWidth: 400,
    containerHeight: 400,
    animationDelay: 0.1,
    animationStagger: 0.03,
    enableHover: true,
  },
}
