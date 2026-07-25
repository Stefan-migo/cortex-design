import { PixelTransition } from './PixelTransition'

const meta = {
  component: PixelTransition,
  tags: ['autodocs'],
  argTypes: {
    gridSize: { control: { type: 'number', min: 5, max: 80, step: 5 } },
    duration: { control: { type: 'number', min: 0.5, max: 6, step: 0.5 } },
    stagger: { control: { type: 'number', min: 0, max: 100, step: 5 } },
  },
}

export default meta

const style = { width: 300, height: 200, objectFit: 'cover', display: 'block' }

export const Default = {
  args: {
    children: [
      <img key="before" src="https://placehold.co/600x400/1a1a2e/5227FF?text=Before" alt="Before" style={style} />,
      <img key="after" src="https://placehold.co/600x400/5227FF/ffffff?text=After" alt="After" style={style} />,
    ],
    gridSize: 20,
    duration: 2,
    stagger: 20,
  },
}

export const FineGrid = {
  args: {
    children: [
      <img key="before" src="https://placehold.co/600x400/1a1a2e/5227FF?text=Before" alt="Before" style={style} />,
      <img key="after" src="https://placehold.co/600x400/5227FF/ffffff?text=After" alt="After" style={style} />,
    ],
    gridSize: 40,
    duration: 2,
    stagger: 10,
  },
}

export const Slow = {
  args: {
    children: [
      <img key="before" src="https://placehold.co/600x400/1a1a2e/5227FF?text=Before" alt="Before" style={style} />,
      <img key="after" src="https://placehold.co/600x400/5227FF/ffffff?text=After" alt="After" style={style} />,
    ],
    gridSize: 20,
    duration: 4,
    stagger: 20,
  },
}

export const Fast = {
  args: {
    children: [
      <img key="before" src="https://placehold.co/600x400/1a1a2e/5227FF?text=Before" alt="Before" style={style} />,
      <img key="after" src="https://placehold.co/600x400/5227FF/ffffff?text=After" alt="After" style={style} />,
    ],
    gridSize: 20,
    duration: 1,
    stagger: 10,
  },
}
