import { TiltedCard } from './TiltedCard'
const meta = { component: TiltedCard, tags: ['autodocs'], argTypes: { scaleOnHover: { control: { type: 'range', min: 1, max: 1.5, step: 0.05 } }, rotateAmplitude: { control: { type: 'range', min: 0, max: 30, step: 1 } }, showTooltip: { control: 'toggle' } } }
export default meta
export const Default = { args: { imageSrc: 'https://picsum.photos/seed/tc1/400/400', captionText: 'Beautiful landscape', containerHeight: '300px', containerWidth: '300px', imageHeight: '300px', imageWidth: '300px', scaleOnHover: 1.1, rotateAmplitude: 14, showTooltip: true } }
export const NoTooltip = { args: { imageSrc: 'https://picsum.photos/seed/tc2/400/400', containerHeight: '300px', containerWidth: '300px', imageHeight: '300px', imageWidth: '300px', scaleOnHover: 1.05, rotateAmplitude: 8, showTooltip: false } }
export const HighRotation = { args: { imageSrc: 'https://picsum.photos/seed/tc3/400/400', captionText: 'Dramatic tilt', containerHeight: '300px', containerWidth: '300px', imageHeight: '300px', imageWidth: '300px', scaleOnHover: 1.2, rotateAmplitude: 25, showTooltip: true } }
