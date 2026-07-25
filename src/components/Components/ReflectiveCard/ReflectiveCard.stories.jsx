import { ReflectiveCard } from './ReflectiveCard'
const meta = { component: ReflectiveCard, tags: ['autodocs'], argTypes: { blurStrength: { control: { type: 'range', min: 0, max: 30, step: 1 } }, noiseScale: { control: { type: 'range', min: 0.1, max: 3, step: 0.1 } }, displacementStrength: { control: { type: 'range', min: 0, max: 50, step: 1 } }, grayscale: { control: { type: 'range', min: 0, max: 1, step: 0.1 } } } }
export default meta
export const Default = { args: { blurStrength: 12, noiseScale: 1, displacementStrength: 20, grayscale: 1 } }
export const Colorful = { args: { blurStrength: 8, noiseScale: 1.5, displacementStrength: 15, grayscale: 0 } }
export const HeavyBlur = { args: { blurStrength: 25, noiseScale: 2, displacementStrength: 35, grayscale: 1 } }
