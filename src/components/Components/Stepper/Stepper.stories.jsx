import { Stepper, Step } from './Stepper'
const meta = { component: Stepper, tags: ['autodocs'], argTypes: { initialStep: { control: { type: 'range', min: 1, max: 5, step: 1 } } } }
export default meta
const stepStyle = { color: '#fff', padding: '1rem 0' }
export const Default = { args: { initialStep: 1, children: [<Step key={1}><div style={stepStyle}>Step 1: Welcome</div></Step>, <Step key={2}><div style={stepStyle}>Step 2: Details</div></Step>, <Step key={3}><div style={stepStyle}>Step 3: Confirm</div></Step>] } }
export const FourSteps = { args: { initialStep: 1, children: [<Step key={1}><div style={stepStyle}>Step 1</div></Step>, <Step key={2}><div style={stepStyle}>Step 2</div></Step>, <Step key={3}><div style={stepStyle}>Step 3</div></Step>, <Step key={4}><div style={stepStyle}>Step 4</div></Step>] } }
