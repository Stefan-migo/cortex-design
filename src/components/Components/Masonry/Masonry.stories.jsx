import { Masonry } from './Masonry'
const meta = { component: Masonry, tags: ['autodocs'], argTypes: { duration: { control: { type: 'range', min: 0.1, max: 2, step: 0.1 } }, stagger: { control: { type: 'range', min: 0, max: 0.3, step: 0.01 } }, animateFrom: { control: 'select', options: ['bottom', 'top', 'left', 'right', 'center', 'random'] }, scaleOnHover: { control: 'toggle' } } }
export default meta
const items = [
  { id: '1', img: 'https://picsum.photos/seed/m1/400/300', url: '#', height: 300 },
  { id: '2', img: 'https://picsum.photos/seed/m2/400/500', url: '#', height: 500 },
  { id: '3', img: 'https://picsum.photos/seed/m3/400/400', url: '#', height: 400 },
  { id: '4', img: 'https://picsum.photos/seed/m4/400/350', url: '#', height: 350 },
  { id: '5', img: 'https://picsum.photos/seed/m5/400/600', url: '#', height: 600 },
  { id: '6', img: 'https://picsum.photos/seed/m6/400/250', url: '#', height: 250 },
]
export const Default = { args: { items, duration: 0.6, stagger: 0.05, animateFrom: 'bottom', scaleOnHover: true } }
export const FromTop = { args: { items, duration: 0.6, stagger: 0.05, animateFrom: 'top', scaleOnHover: true } }
export const RandomEntry = { args: { items, duration: 0.8, stagger: 0.08, animateFrom: 'random', scaleOnHover: false } }
