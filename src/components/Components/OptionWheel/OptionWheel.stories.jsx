import { OptionWheel } from './OptionWheel'
const meta = { component: OptionWheel, tags: ['autodocs'], argTypes: { fontSize: { control: { type: 'range', min: 1, max: 6, step: 0.5 } }, spacing: { control: { type: 'range', min: 0.5, max: 3, step: 0.1 } }, curve: { control: { type: 'range', min: 0, max: 3, step: 0.1 } }, tilt: { control: { type: 'range', min: 0, max: 20, step: 1 } }, side: { control: 'select', options: ['left', 'right'] }, loop: { control: 'toggle' } } }
export default meta
export const Default = { args: { fontSize: 3, spacing: 1.4, curve: 1, tilt: 6, side: 'left', loop: false, defaultSelected: 3 } }
export const RightSide = { args: { fontSize: 3, spacing: 1.4, curve: 1, tilt: 6, side: 'right', loop: true, defaultSelected: 3 } }
export const SteepCurve = { args: { fontSize: 3, spacing: 2, curve: 2, tilt: 12, side: 'left', loop: true, defaultSelected: 3 } }
export const Shallow = { args: { fontSize: 2, spacing: 1, curve: 0.5, tilt: 2, side: 'left', loop: false, defaultSelected: 0 } }
