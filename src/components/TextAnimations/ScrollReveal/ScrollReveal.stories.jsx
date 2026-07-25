import { ScrollReveal } from './ScrollReveal'

const meta = {
  component: ScrollReveal,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    splitBy: { control: 'select', options: ['words', 'chars'] },
    blur: { control: 'boolean' },
    baseOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
    baseRotation: { control: { type: 'range', min: 0, max: 20, step: 1 } },
    staggerRatio: { control: { type: 'range', min: 0, max: 0.5, step: 0.05 } },
  },
}

export default meta

export const Default = {
  args: {
    children: 'Scroll Reveal',
    splitBy: 'words',
    blur: true,
    baseOpacity: 0.1,
    baseRotation: 3,
    staggerRatio: 0.15,
  },
}

export const NoBlur = {
  args: {
    children: 'No Blur',
    splitBy: 'words',
    blur: false,
    baseOpacity: 0.1,
    baseRotation: 3,
    staggerRatio: 0.15,
  },
}

export const ByCharacter = {
  args: {
    children: 'Character Reveal',
    splitBy: 'chars',
    blur: true,
    baseOpacity: 0,
    baseRotation: 5,
    staggerRatio: 0.08,
  },
}

export const Subtle = {
  args: {
    children: 'Subtle Reveal',
    splitBy: 'words',
    blur: false,
    baseOpacity: 0.4,
    baseRotation: 0,
    staggerRatio: 0.2,
  },
}
