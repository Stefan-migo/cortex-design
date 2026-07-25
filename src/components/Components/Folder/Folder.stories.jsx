import { Folder } from './Folder'
const meta = { component: Folder, tags: ['autodocs'], argTypes: { color: { control: 'color' }, size: { control: { type: 'range', min: 0.5, max: 3, step: 0.1 } } } }
export default meta
export const Default = { args: { color: '#5227FF', size: 1 } }
export const RedFolder = { args: { color: '#ef4444', size: 1 } }
export const Large = { args: { color: '#10b981', size: 2 } }
export const Small = { args: { color: '#f59e0b', size: 0.7 } }
export const WithContent = { args: { color: '#5227FF', size: 1, items: [<span key={1}>📄</span>, <span key={2}>📝</span>, <span key={3}>📎</span>] } }
