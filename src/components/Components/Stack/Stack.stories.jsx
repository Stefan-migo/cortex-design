import { Stack } from './Stack'
const meta = { component: Stack, tags: ['autodocs'], argTypes: { randomRotation: { control: 'toggle' }, sendToBackOnClick: { control: 'toggle' }, autoplay: { control: 'toggle' }, autoplayDelay: { control: { type: 'range', min: 1000, max: 10000, step: 500 } } } }
export default meta
const imgStyle = { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }
const cards = [
  <img key={1} src="https://picsum.photos/seed/s1/400/500" alt="1" style={imgStyle} />,
  <img key={2} src="https://picsum.photos/seed/s2/400/500" alt="2" style={imgStyle} />,
  <img key={3} src="https://picsum.photos/seed/s3/400/500" alt="3" style={imgStyle} />,
  <img key={4} src="https://picsum.photos/seed/s4/400/500" alt="4" style={imgStyle} />,
]
export const Default = { args: { cards, randomRotation: false, sendToBackOnClick: true } }
export const Autoplay = { args: { cards, randomRotation: true, autoplay: true, autoplayDelay: 2000 } }
