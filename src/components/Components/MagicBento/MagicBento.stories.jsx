import { MagicBento } from './MagicBento'
const meta = { component: MagicBento, tags: ['autodocs'], argTypes: { enableSpotlight: { control: 'toggle' }, enableBorderGlow: { control: 'toggle' }, enableStars: { control: 'toggle' }, enableTilt: { control: 'toggle' }, clickEffect: { control: 'toggle' } } }
export default meta
export const Default = { args: { enableSpotlight: true, enableBorderGlow: true, enableStars: true, enableTilt: false, clickEffect: true } }
export const Minimal = { args: { enableSpotlight: false, enableBorderGlow: false, enableStars: false, enableTilt: false, clickEffect: false } }
export const WithTilt = { args: { enableSpotlight: true, enableBorderGlow: true, enableStars: true, enableTilt: true, clickEffect: true } }
