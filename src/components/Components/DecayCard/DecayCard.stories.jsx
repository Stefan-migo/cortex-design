import { DecayCard } from './DecayCard'
const meta = { component: DecayCard, tags: ['autodocs'], argTypes: { width: { control: { type: 'range', min: 150, max: 600, step: 10 } }, height: { control: { type: 'range', min: 200, max: 800, step: 10 } }, baseFrequency: { control: { type: 'range', min: 0.001, max: 0.1, step: 0.001 } }, numOctaves: { control: { type: 'range', min: 1, max: 10, step: 1 } }, maxDisplacement: { control: { type: 'range', min: 50, max: 800, step: 10 } }, movementBound: { control: { type: 'range', min: 10, max: 200, step: 5 } } } }
export default meta
export const Default = { args: { width: 300, height: 400, baseFrequency: 0.015, numOctaves: 5, seed: 4, maxDisplacement: 400, movementBound: 50, children: 'Decay\nCard' } }
export const Subtle = { args: { width: 300, height: 400, baseFrequency: 0.005, numOctaves: 3, maxDisplacement: 100, movementBound: 30, children: 'Subtle\nEffect' } }
export const Heavy = { args: { width: 300, height: 400, baseFrequency: 0.03, numOctaves: 7, maxDisplacement: 600, movementBound: 80, children: 'Heavy\nDecay' } }
export const Wide = { args: { width: 500, height: 300, baseFrequency: 0.015, numOctaves: 5, maxDisplacement: 400, movementBound: 50, children: 'Wide\nCard' } }
