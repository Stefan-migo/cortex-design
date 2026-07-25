import { CurtainReveal } from './CurtainReveal'

export default {
  component: CurtainReveal,
  tags: ['autodocs'],
  argTypes: {
    curtainColor: { control: 'color', description: 'Background color of the initial curtain' },
    accentColor: { control: 'color', description: 'Accent color for vector and words' },
    autoPlay: { control: 'boolean', description: 'Start animation automatically on mount' },
    leftWord: { control: 'text', description: 'Left side word' },
    rightWord: { control: 'text', description: 'Right side word' },
    leftDescription: { control: 'text', description: 'Description text below left word' },
    rightDescription: { control: 'text', description: 'Description text below right word' },
  },
}

export const Default = {
  args: {
    curtainColor: '#8b0000',
    accentColor: '#d11c1c',
    autoPlay: true,
    leftWord: 'Voyeur',
    rightWord: 'Vérité',
    leftDescription:
      'TO EVOKE A SENSE OF CURIOSITY, FASCINATION OR DESIRE TO UNDERSTAND.',
    rightDescription:
      'TO PROVIDE AN UNFILTERED AND GENUINE PORTRAYAL OF REALITY.',
  },
}

export const DarkCurtain = {
  args: {
    curtainColor: '#1a0000',
    accentColor: '#C8102E',
    autoPlay: true,
    leftWord: 'Voyeur',
    rightWord: 'Vérité',
    leftDescription:
      'TO EVOKE A SENSE OF CURIOSITY, FASCINATION OR DESIRE TO UNDERSTAND.',
    rightDescription:
      'TO PROVIDE AN UNFILTERED AND GENUINE PORTRAYAL OF REALITY.',
  },
}

export const ManualPlay = {
  args: {
    curtainColor: '#8b0000',
    accentColor: '#2B6B4A',
    autoPlay: false,
    leftWord: 'Observe',
    rightWord: 'Capture',
    leftDescription: 'WATCH WITHOUT INTERFERENCE.',
    rightDescription: 'FRAME WITH INTEGRITY.',
  },
}
