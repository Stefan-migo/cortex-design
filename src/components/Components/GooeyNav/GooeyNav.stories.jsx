import { GooeyNav } from './GooeyNav'
const meta = { component: GooeyNav, tags: ['autodocs'], argTypes: { particleCount: { control: { type: 'range', min: 5, max: 40, step: 1 } }, particleDistances: { control: 'object' }, initialActiveIndex: { control: { type: 'range', min: 0, max: 10, step: 1 } } } }
export default meta
const items = [{ label: 'Home', href: '#' }, { label: 'About', href: '#' }, { label: 'Work', href: '#' }, { label: 'Contact', href: '#' }]
export const Default = { args: { items, particleCount: 15, initialActiveIndex: 0 } }
export const FewParticles = { args: { items, particleCount: 6, initialActiveIndex: 0 } }
export const ManyParticles = { args: { items, particleCount: 30, initialActiveIndex: 0 } }
export const ThreeItems = { args: { items: items.slice(0, 3), particleCount: 15, initialActiveIndex: 0 } }
