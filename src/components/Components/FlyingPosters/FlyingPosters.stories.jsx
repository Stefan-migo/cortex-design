import { FlyingPosters } from './FlyingPosters'
const meta = { component: FlyingPosters, tags: ['autodocs'], argTypes: { planeWidth: { control: { type: 'range', min: 100, max: 600, step: 10 } }, planeHeight: { control: { type: 'range', min: 100, max: 600, step: 10 } }, distortion: { control: { type: 'range', min: 0, max: 10, step: 0.5 } }, scrollEase: { control: { type: 'range', min: 0.001, max: 0.1, step: 0.005 } } } }
export default meta
const sampleImages = [
  'https://picsum.photos/seed/p1/400/400', 'https://picsum.photos/seed/p2/400/400', 'https://picsum.photos/seed/p3/400/400',
  'https://picsum.photos/seed/p4/400/400', 'https://picsum.photos/seed/p5/400/400',
]
export const Default = { args: { items: sampleImages, planeWidth: 320, planeHeight: 320, distortion: 3, scrollEase: 0.01 } }
export const LowDistortion = { args: { items: sampleImages, planeWidth: 320, planeHeight: 320, distortion: 1, scrollEase: 0.02 } }
export const HighDistortion = { args: { items: sampleImages, planeWidth: 320, planeHeight: 320, distortion: 8, scrollEase: 0.005 } }
export const SmallPlanes = { args: { items: sampleImages, planeWidth: 200, planeHeight: 200, distortion: 3, scrollEase: 0.01 } }
