import { Lanyard } from './Lanyard'
const meta = { component: Lanyard, tags: ['autodocs'], argTypes: { fov: { control: { type: 'range', min: 10, max: 40, step: 1 } }, lanyardWidth: { control: { type: 'range', min: 0.5, max: 3, step: 0.25 } }, transparent: { control: 'toggle' } } }
export default meta
export const Default = { args: { fov: 20, lanyardWidth: 1, transparent: true } }
export const WideStrap = { args: { fov: 20, lanyardWidth: 2.5, transparent: true } }
export const CloseUp = { args: { fov: 12, lanyardWidth: 1, transparent: true } }
