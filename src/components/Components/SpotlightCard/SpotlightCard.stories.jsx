import { SpotlightCard } from './SpotlightCard'
const meta = { component: SpotlightCard, tags: ['autodocs'], argTypes: { spotlightColor: { control: 'color' } } }
export default meta
const cardStyle = { padding: '40px', textAlign: 'center', color: '#fff' }
export const Default = { args: { children: <div style={cardStyle}>Spotlight Card</div>, spotlightColor: 'rgba(255,255,255,0.25)' } }
export const Purple = { args: { children: <div style={cardStyle}>Purple Spotlight</div>, spotlightColor: 'rgba(168,85,247,0.3)' } }
export const Blue = { args: { children: <div style={cardStyle}>Blue Spotlight</div>, spotlightColor: 'rgba(59,130,246,0.3)' } }
