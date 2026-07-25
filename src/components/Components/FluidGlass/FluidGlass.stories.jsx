import { FluidGlass } from './FluidGlass'
const meta = { component: FluidGlass, tags: ['autodocs'], argTypes: { mode: { control: 'select', options: ['lens', 'bar', 'cube'] } } }
export default meta
export const Default = { args: { mode: 'lens' } }
export const BarMode = { args: { mode: 'bar' } }
export const CubeMode = { args: { mode: 'cube' } }
