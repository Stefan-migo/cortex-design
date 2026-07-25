import { ElasticSlider } from './ElasticSlider'
const meta = { component: ElasticSlider, tags: ['autodocs'], argTypes: { defaultValue: { control: { type: 'range', min: 0, max: 100, step: 1 } }, maxValue: { control: { type: 'range', min: 10, max: 500, step: 10 } }, startingValue: { control: { type: 'range', min: 0, max: 100, step: 1 } }, isStepped: { control: 'toggle' }, stepSize: { control: { type: 'range', min: 1, max: 50, step: 1 } } } }
export default meta
export const Default = { args: { defaultValue: 50, startingValue: 0, maxValue: 100, isStepped: false } }
export const Stepped = { args: { defaultValue: 30, startingValue: 0, maxValue: 100, isStepped: true, stepSize: 10 } }
export const WideRange = { args: { defaultValue: 250, startingValue: 0, maxValue: 500, isStepped: false } }
export const LowDefault = { args: { defaultValue: 10, startingValue: 0, maxValue: 100, isStepped: true, stepSize: 5 } }
