import { PixelCard } from './PixelCard'
const meta = { component: PixelCard, tags: ['autodocs'], argTypes: { variant: { control: 'select', options: ['default', 'blue', 'yellow', 'pink'] } } }
export default meta
const contentStyle = { color: '#fff', textAlign: 'center', position: 'relative', zIndex: 1, padding: '2rem' }
export const Default = { args: { variant: 'default', children: <div style={contentStyle}>Pixel Card</div> } }
export const Blue = { args: { variant: 'blue', children: <div style={contentStyle}>Blue Pulse</div> } }
export const Yellow = { args: { variant: 'yellow', children: <div style={contentStyle}>Yellow</div> } }
export const Pink = { args: { variant: 'pink', children: <div style={contentStyle}>Pink</div> } }
