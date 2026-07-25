import { CircularText } from './CircularText'

const meta = {
  component: CircularText,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    spinDuration: { control: { type: 'range', min: 5, max: 60, step: 5 } },
    onHover: {
      control: 'select',
      options: ['none', 'speedUp', 'slowDown', 'pause', 'goBonkers'],
    },
  },
}

export default meta

export const Default = {
  args: {
    text: 'CIRCULAR•TEXT•',
    spinDuration: 20,
    onHover: 'none',
  },
}

export const SlowSpin = {
  args: {
    text: 'SLOW•MOTION•',
    spinDuration: 40,
    onHover: 'none',
  },
}

export const SpeedUpOnHover = {
  args: {
    text: 'SPEED•UP•',
    spinDuration: 20,
    onHover: 'speedUp',
  },
}

export const PauseOnHover = {
  args: {
    text: 'PAUSE•ME•',
    spinDuration: 20,
    onHover: 'pause',
  },
}

export const GoBonkers = {
  args: {
    text: 'BONKERS•',
    spinDuration: 20,
    onHover: 'goBonkers',
  },
}
