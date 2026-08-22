import { Progress } from './Progress'

const meta = {
  component: Progress,
  tags: ['autodocs'],
}

export default meta

export const Default = {
  args: {
    value: 40,
    max: 100,
    'aria-label': 'Upload progress',
  },
}

export const AtMax = {
  args: {
    value: 100,
    'aria-label': 'Download progress',
  },
}

export const CustomRange = {
  args: {
    value: 25,
    min: 0,
    max: 200,
    'aria-label': 'Quota used',
    'aria-valuetext': '25 of 200 GB used',
  },
}
