import { DomeGallery } from './DomeGallery'
const meta = { component: DomeGallery, tags: ['autodocs'], argTypes: { fit: { control: { type: 'range', min: 0.1, max: 1, step: 0.05 } }, bend: { control: false }, dragSensitivity: { control: { type: 'range', min: 5, max: 50, step: 1 } }, grayscale: { control: 'toggle' } } }
export default meta
export const Default = { args: { fit: 0.5, dragSensitivity: 20, grayscale: true } }
export const ColorImages = { args: { fit: 0.5, dragSensitivity: 20, grayscale: false } }
export const TightFit = { args: { fit: 0.3, dragSensitivity: 25, grayscale: true } }
export const LooseFit = { args: { fit: 0.7, dragSensitivity: 15, grayscale: true } }
