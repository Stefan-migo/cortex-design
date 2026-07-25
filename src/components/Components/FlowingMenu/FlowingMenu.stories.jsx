import { FlowingMenu } from './FlowingMenu'
const meta = { component: FlowingMenu, tags: ['autodocs'], argTypes: { speed: { control: { type: 'range', min: 5, max: 60, step: 1 } }, textColor: { control: 'color' }, bgColor: { control: 'color' }, marqueeBgColor: { control: 'color' }, marqueeTextColor: { control: 'color' }, borderColor: { control: 'color' } } }
export default meta
const items = [
  { link: '#', text: 'Home', image: 'https://picsum.photos/200/100?random=1' },
  { link: '#', text: 'About', image: 'https://picsum.photos/200/100?random=2' },
  { link: '#', text: 'Work', image: 'https://picsum.photos/200/100?random=3' },
  { link: '#', text: 'Contact', image: 'https://picsum.photos/200/100?random=4' },
]
export const Default = { args: { items, speed: 15 } }
export const LightTheme = { args: { items, speed: 15, bgColor: '#f5f5f5', textColor: '#120F17', marqueeBgColor: '#120F17', marqueeTextColor: '#fff', borderColor: '#333' } }
export const TwoItems = { args: { items: items.slice(0, 2), speed: 20 } }
export const Fast = { args: { items, speed: 8 } }
