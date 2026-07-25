import { CurvedInput } from './CurvedInput'
const meta = { component: CurvedInput, tags: ['autodocs'], argTypes: { theme: { control: 'select', options: ['dark', 'light'] }, bend: { control: { type: 'range', min: -50, max: 50, step: 1 } }, width: { control: { type: 'range', min: 200, max: 800, step: 10 } }, fontSize: { control: { type: 'range', min: 12, max: 32, step: 1 } }, showButton: { control: 'toggle' }, showIcon: { control: 'toggle' } } }
export default meta
export const Default = { args: { theme: 'dark', placeholder: 'Enter your email', buttonText: 'Get Started', bend: 28, fontSize: 16, showButton: true, showIcon: true } }
export const Light = { args: { theme: 'light', placeholder: 'Your email address', buttonText: 'Subscribe', bend: 20, fontSize: 16 } }
export const NoButton = { args: { theme: 'dark', placeholder: 'Type something...', showButton: false, bend: 0, fontSize: 16 } }
export const HighBend = { args: { theme: 'dark', placeholder: 'Curved input', buttonText: 'Go', bend: 45, fontSize: 18, showIcon: true } }
export const Minimal = { args: { theme: 'light', placeholder: 'Search...', showButton: false, showIcon: false, bend: 15, fontSize: 14 } }
