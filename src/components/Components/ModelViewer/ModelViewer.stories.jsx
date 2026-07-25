import { ModelViewer } from './ModelViewer'
const meta = { component: ModelViewer, tags: ['autodocs'], argTypes: { autoRotate: { control: 'toggle' }, autoRotateSpeed: { control: { type: 'range', min: 0.1, max: 2, step: 0.05 } }, enableManualRotation: { control: 'toggle' }, enableManualZoom: { control: 'toggle' }, defaultZoom: { control: { type: 'range', min: 0.1, max: 5, step: 0.1 } } } }
export default meta
export const Default = { args: { url: 'https://example.com/model.glb', width: 400, height: 400, autoRotate: true, autoRotateSpeed: 0.35, enableManualRotation: true, enableManualZoom: true, defaultZoom: 0.5 } }
export const ManualOnly = { args: { url: 'https://example.com/model.glb', width: 400, height: 400, autoRotate: false, enableManualRotation: true, enableManualZoom: true } }
export const Close = { args: { url: 'https://example.com/model.glb', width: 400, height: 400, autoRotate: true, defaultZoom: 1.5 } }
