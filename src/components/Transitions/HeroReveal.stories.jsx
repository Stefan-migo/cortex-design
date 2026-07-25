import { HeroReveal } from './HeroReveal'

export default {
  component: HeroReveal,
  tags: ['autodocs'],
  argTypes: {
    curtainColor: { control: 'color' },
    accentColor: { control: 'color' },
    panelColor: { control: 'color' },
  },
}

export const Default = {
  args: {
    curtainColor: '#8b0000',
    accentColor: '#d11c1c',
    panelColor: '#f6f5ef',
    leftWord: 'Voyeur',
    rightWord: 'Vérité',
    leftDescription:
      'TO EVOKE A SENSE OF CURIOSITY, FASCINATION OR DESIRE TO UNDERSTAND.',
    rightDescription:
      'TO PROVIDE AN UNFILTERED AND GENUINE PORTRAYAL OF REALITY.',
    cards: [
      {
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200',
      },
      {
        image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200',
      },
    ],
  },
}

export const Dark = {
  args: {
    curtainColor: '#1a0000',
    accentColor: '#ffffff',
    panelColor: '#1a0000',
    leftWord: 'Voyeur',
    rightWord: 'Vérité',
    leftDescription:
      'TO EVOKE A SENSE OF CURIOSITY, FASCINATION OR DESIRE TO UNDERSTAND.',
    rightDescription:
      'TO PROVIDE AN UNFILTERED AND GENUINE PORTRAYAL OF REALITY.',
    cards: [
      {
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200',
      },
      {
        image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200',
      },
    ],
  },
}
