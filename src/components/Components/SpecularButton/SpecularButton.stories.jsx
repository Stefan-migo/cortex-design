import { SpecularButton } from './SpecularButton'
const meta = { component: SpecularButton, tags: ['autodocs'], argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] }, intensity: { control: { type: 'range', min: 0, max: 3, step: 0.1 } }, thickness: { control: { type: 'range', min: 0.5, max: 3, step: 0.5 } }, speed: { control: { type: 'range', min: 0.05, max: 2, step: 0.05 } }, autoAnimate: { control: 'toggle' } } }
export default meta
export const Default = { args: { children: 'Get Started', size: 'lg', intensity: 1, speed: 0.35 } }
export const Small = { args: { children: 'Save', size: 'sm', intensity: 1.5 } }
export const AutoAnimate = { args: { children: 'Hover Me', size: 'lg', autoAnimate: true, intensity: 1.2, speed: 0.5 } }
export const Thin = { args: { children: 'Submit', size: 'md', thickness: 0.5, intensity: 2 } }
