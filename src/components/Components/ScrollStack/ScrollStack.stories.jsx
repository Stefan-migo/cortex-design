import { ScrollStack } from './ScrollStack'
const meta = { component: ScrollStack, tags: ['autodocs'] }
export default meta
const cardStyle = { color: '#fff', padding: '2rem' }
export const Default = { args: { children: [<div key={1} style={cardStyle}>Card 1 — Scroll down</div>, <div key={2} style={cardStyle}>Card 2 — Stacking</div>, <div key={3} style={cardStyle}>Card 3 — Together</div>] } }
