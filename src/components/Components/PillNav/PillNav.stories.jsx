import { PillNav } from './PillNav'
const meta = { component: PillNav, tags: ['autodocs'], argTypes: { baseColor: { control: 'color' }, pillColor: { control: 'color' }, hoveredPillTextColor: { control: 'color' }, pillTextColor: { control: 'color' }, initialLoadAnimation: { control: 'toggle' } } }
export default meta
const items = [{ label: 'Home', href: '#' }, { label: 'About', href: '#' }, { label: 'Work', href: '#' }, { label: 'Contact', href: '#' }]
export const Default = { args: { logo: 'https://placeholder.pics/svg/36x36/C', logoAlt: 'Logo', items, baseColor: '#fff', pillColor: '#120F17', initialLoadAnimation: false } }
export const Dark = { args: { logo: 'https://placeholder.pics/svg/36x36/C', logoAlt: 'Logo', items, baseColor: '#120F17', pillColor: '#fff', hoveredPillTextColor: '#120F17', pillTextColor: '#120F17' } }
export const Purple = { args: { logo: 'https://placeholder.pics/svg/36x36/C', logoAlt: 'Logo', items, baseColor: '#5227FF', pillColor: '#fff', pillTextColor: '#5227FF' } }
