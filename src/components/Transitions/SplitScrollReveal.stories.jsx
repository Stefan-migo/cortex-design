import { SplitScrollReveal } from './SplitScrollReveal'

export default {
  component: SplitScrollReveal,
  tags: ['autodocs'],
  argTypes: {
    accentColor: { control: 'color' },
    panelColor: { control: 'color' },
    autoPlay: { control: 'boolean' },
  },
}

const IMAGES = [
  {
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200',
    title: 'The Symphony of Dance',
  },
  {
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200',
    title: 'Stand Up',
  },
]

export const Default = {
  args: {
    cards: IMAGES,
    panelColor: '#f6f5ef',
    accentColor: '#C8102E',
    autoPlay: true,
  },
}

export const DarkPanels = {
  args: {
    cards: IMAGES,
    panelColor: '#1a0000',
    accentColor: '#ffffff',
    autoPlay: true,
  },
}

export const SingleCard = {
  args: {
    cards: [IMAGES[0]],
    panelColor: '#f6f5ef',
    accentColor: '#C8102E',
    autoPlay: true,
  },
}

export const Manual = {
  args: {
    cards: IMAGES,
    panelColor: '#f6f5ef',
    accentColor: '#C8102E',
    autoPlay: false,
  },
}
