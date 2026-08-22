import React from 'react'
import { TextPressure } from './TextPressure'

/** Injects Roboto Flex variable font for TextPressure stories. */
const withFont = (Story) => {
  React.useEffect(() => {
    if (!document.querySelector('#sb-font-loader')) {
      const link = document.createElement('link')
      link.id = 'sb-font-loader'
      link.rel = 'stylesheet'
      link.href =
        'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght,wght@8..144,100..900&display=swap'
      document.head.appendChild(link)
    }
  }, [])
  return <Story />
}

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
