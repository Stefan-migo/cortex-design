import { FuzzyText } from './FuzzyText'

const meta = {
  component: FuzzyText,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    baseIntensity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    hoverIntensity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    fuzzRange: { control: { type: 'range', min: 1, max: 100 } },
    direction: { control: 'select', options: ['horizontal', 'vertical', 'both'] },
    fontWeight: { control: { type: 'range', min: 100, max: 900, step: 100 } },
    enableHover: { control: 'boolean' },
    glitchMode: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: {
    children: 'Fuzzy Text',
    baseIntensity: 0.18,
    hoverIntensity: 0.5,
    fuzzRange: 30,
    direction: 'horizontal',
    fontWeight: 900,
    enableHover: true,
    glitchMode: false,
  },
}

export const Vertical = {
  args: {
    children: 'Vertical',
    baseIntensity: 0.18,
    hoverIntensity: 0.5,
    fuzzRange: 30,
    direction: 'vertical',
    fontWeight: 900,
    enableHover: true,
    glitchMode: false,
  },
}

export const HighFuzz = {
  args: {
    children: 'High Fuzz',
    baseIntensity: 0.3,
    hoverIntensity: 0.5,
    fuzzRange: 80,
    direction: 'horizontal',
    fontWeight: 900,
    enableHover: true,
    glitchMode: false,
  },
}

export const GlitchMode = {
  args: {
    children: 'Glitch',
    baseIntensity: 0.18,
    hoverIntensity: 0.5,
    fuzzRange: 30,
    direction: 'horizontal',
    fontWeight: 900,
    enableHover: false,
    glitchMode: true,
  },
}
