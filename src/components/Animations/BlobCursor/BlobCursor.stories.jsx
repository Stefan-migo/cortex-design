import { BlobCursor } from './BlobCursor'

const meta = {
  component: BlobCursor,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    blendMode: { control: 'radio', options: ['gooey', 'fade'] },
    radius: { control: { type: 'number', min: 10, max: 100, step: 5 } },
  },
}

export default meta

export const Default = {
  args: {
    color: '#5227FF',
    blendMode: 'gooey',
    radius: 30,
  },
}

export const LargeBlob = {
  args: {
    color: '#5227FF',
    blendMode: 'gooey',
    radius: 50,
  },
}

export const FadeMode = {
  args: {
    color: '#5227FF',
    blendMode: 'fade',
    radius: 30,
  },
}

export const DifferentColor = {
  args: {
    color: '#ff6b35',
    blendMode: 'gooey',
    radius: 30,
  },
}
