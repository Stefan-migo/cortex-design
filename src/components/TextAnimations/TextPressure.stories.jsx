import { TextPressure } from './TextPressure'
import { withFont } from '../../../.storybook/preview'

const meta = {
  component: TextPressure,
  tags: ['autodocs'],
  decorators: [withFont],
  argTypes: {
    text: { control: 'text' },
    flex: { control: 'boolean' },
    width: { control: 'boolean' },
    weight: { control: 'boolean' },
    italic: { control: 'boolean' },
    alpha: { control: 'boolean' },
    stroke: { control: 'boolean' },
    textColor: { control: 'color' },
    strokeColor: { control: 'color' },
  },
}

export default meta

export const Default = {
  args: { text: 'Compressa', flex: true, width: true, weight: true, italic: true, alpha: false, stroke: false },
}

export const AllAxes = {
  args: { text: 'Compressa', flex: true, width: true, weight: true, italic: true, alpha: true, stroke: true },
}

export const NoFlex = {
  args: { text: 'Compressa', flex: false, width: true, weight: true, italic: true, alpha: false, stroke: false },
}

export const Minimal = {
  args: { text: 'Compressa', flex: false, width: false, weight: true, italic: false, alpha: false, stroke: false },
}
