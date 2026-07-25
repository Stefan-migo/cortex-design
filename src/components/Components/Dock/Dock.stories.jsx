import { Dock } from './Dock'
const meta = { component: Dock, tags: ['autodocs'], argTypes: { magnification: { control: { type: 'range', min: 40, max: 120, step: 5 } }, distance: { control: { type: 'range', min: 50, max: 400, step: 10 } }, panelHeight: { control: { type: 'range', min: 40, max: 120, step: 4 } }, baseItemSize: { control: { type: 'range', min: 30, max: 80, step: 5 } } } }
export default meta
const HomeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
const SearchIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
const MailIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const SettingsIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>

const defaultItems = [
  { icon: <HomeIcon />, label: 'Home', onClick: () => {} },
  { icon: <SearchIcon />, label: 'Search', onClick: () => {} },
  { icon: <MailIcon />, label: 'Messages', onClick: () => {} },
  { icon: <SettingsIcon />, label: 'Settings', onClick: () => {} },
]

export const Default = { args: { items: defaultItems, magnification: 70, distance: 200, panelHeight: 68, baseItemSize: 50 } }
export const SmallDock = { args: { items: defaultItems.slice(0, 2), magnification: 60, distance: 150, panelHeight: 56, baseItemSize: 40 } }
export const HighMagnification = { args: { items: defaultItems, magnification: 100, distance: 250, panelHeight: 68, baseItemSize: 50 } }
