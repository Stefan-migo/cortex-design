import { StaggeredMenu } from './StaggeredMenu'
const meta = { component: StaggeredMenu, tags: ['autodocs'], argTypes: { position: { control: 'select', options: ['left', 'right'] }, displaySocials: { control: 'toggle' }, displayItemNumbering: { control: 'toggle' }, isFixed: { control: 'toggle' } } }
export default meta
const items = [{ label: 'Home', ariaLabel: 'Home', link: '#' }, { label: 'About', ariaLabel: 'About', link: '#' }, { label: 'Work', ariaLabel: 'Work', link: '#' }, { label: 'Contact', ariaLabel: 'Contact', link: '#' }]
const socials = [{ label: 'Twitter', link: '#' }, { label: 'GitHub', link: '#' }]
export const Default = { args: { items, socialItems: socials, position: 'right', colors: ['#B497CF', '#5227FF'], displaySocials: true, displayItemNumbering: true, accentColor: '#5227FF' } }
export const Left = { args: { items, socialItems: socials, position: 'left', colors: ['#2a2a3e', '#6366f1'], displaySocials: true, displayItemNumbering: true, accentColor: '#6366f1' } }
export const NoSocials = { args: { items, position: 'right', colors: ['#B497CF', '#5227FF'], displaySocials: false, displayItemNumbering: true } }
