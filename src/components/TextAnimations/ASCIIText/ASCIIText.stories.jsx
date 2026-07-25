import { ASCIIText } from './ASCIIText'

const meta = {
  component: ASCIIText,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    enableWaves: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  args: {
    text: 'ASCII',
    enableWaves: true,
  },
}

export const NoWaves = {
  args: {
    text: 'ASCII',
    enableWaves: false,
  },
}
