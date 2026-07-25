import { Carousel } from './Carousel'

const meta = {
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    baseWidth: { control: { type: 'range', min: 150, max: 600, step: 10 } },
    autoplay: { control: 'toggle' },
    autoplayDelay: { control: { type: 'range', min: 1000, max: 10000, step: 500 } },
    pauseOnHover: { control: 'toggle' },
    loop: { control: 'toggle' },
    round: { control: 'toggle' },
  },
}

export default meta

export const Default = {
  args: {
    baseWidth: 300,
    autoplay: false,
    loop: false,
    round: false,
  },
}

export const Autoplay = {
  args: {
    baseWidth: 300,
    autoplay: true,
    autoplayDelay: 3000,
    loop: true,
    pauseOnHover: true,
    round: false,
  },
}

export const RoundMode = {
  args: {
    baseWidth: 300,
    autoplay: true,
    autoplayDelay: 2500,
    loop: true,
    round: true,
  },
}

export const Wide = {
  args: {
    baseWidth: 500,
    autoplay: true,
    autoplayDelay: 4000,
    loop: true,
    round: false,
  },
}

export const CustomItems = {
  args: {
    baseWidth: 300,
    autoplay: false,
    loop: false,
    round: false,
    items: [
      { title: 'Getting Started', description: 'Quick setup guide for beginners.', id: 1 },
      { title: 'Components', description: 'Explore our component library.', id: 2 },
      { title: 'Themes', description: 'Customize your design system.', id: 3 },
    ],
  },
}
