import { DecryptedText } from './DecryptedText'

const meta = {
  component: DecryptedText,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    trigger: { control: 'select', options: ['auto', 'hover', 'scroll'] },
    speed: { control: { type: 'range', min: 10, max: 300, step: 10 } },
    chars: { control: 'text' },
    sequential: { control: 'boolean' },
    loop: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: {
    text: 'Decrypted Text',
    trigger: 'auto',
    speed: 50,
    sequential: true,
    loop: false,
  },
}

export const HoverTrigger = {
  args: {
    text: 'Hover to Reveal',
    trigger: 'hover',
    speed: 50,
    sequential: true,
    loop: false,
  },
}

export const Instant = {
  args: {
    text: 'All at Once',
    trigger: 'auto',
    speed: 50,
    sequential: false,
    loop: false,
  },
}

export const Loop = {
  args: {
    text: 'Looping Reveal',
    trigger: 'auto',
    speed: 80,
    sequential: true,
    loop: true,
  },
}

export const CustomChars = {
  args: {
    text: 'Custom Chars!',
    trigger: 'auto',
    speed: 50,
    chars: '!@#$%',
    sequential: true,
    loop: false,
  },
}
