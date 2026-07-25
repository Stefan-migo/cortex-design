import { GlassSurface } from './GlassSurface'
const meta = { component: GlassSurface, tags: ['autodocs'], argTypes: { width: { control: 'text' }, height: { control: 'text' }, borderRadius: { control: { type: 'range', min: 0, max: 60, step: 2 } }, blur: { control: { type: 'range', min: 0, max: 50, step: 1 } }, opacity: { control: { type: 'range', min: 0, max: 1, step: 0.05 } }, brightness: { control: { type: 'range', min: 0, max: 100, step: 5 } }, displace: { control: { type: 'range', min: 0, max: 30, step: 1 } } } }
export default meta
const contentStyle = { color: '#fff', textAlign: 'center', padding: '2rem' }
export const Default = { args: { width: '300px', height: '150px', children: <div style={contentStyle}>Glass Effect</div>, borderRadius: 20, blur: 11, opacity: 0.93 } }
export const Small = { args: { width: '200px', height: '80px', children: <div style={contentStyle}>Small</div>, borderRadius: 12, blur: 8, opacity: 0.85 } }
export const HighDisplace = { args: { width: '300px', height: '150px', children: <div style={contentStyle}>Displaced</div>, borderRadius: 20, blur: 15, displace: 10, distortionScale: -300 } }
