import { LineSidebar } from './LineSidebar'
const meta = { component: LineSidebar, tags: ['autodocs'], argTypes: { accentColor: { control: 'color' }, textColor: { control: 'color' }, markerColor: { control: 'color' }, showIndex: { control: 'toggle' }, showMarker: { control: 'toggle' }, proximityRadius: { control: { type: 'range', min: 20, max: 300, step: 10 } }, maxShift: { control: { type: 'range', min: 0, max: 100, step: 5 } }, falloff: { control: 'select', options: ['linear', 'smooth', 'sharp'] }, smoothing: { control: { type: 'range', min: 10, max: 500, step: 10 } } } }
export default meta
export const Default = { args: { accentColor: '#A855F7', showIndex: true, showMarker: true, proximityRadius: 100, maxShift: 30, falloff: 'smooth' } }
export const NoMarkers = { args: { accentColor: '#A855F7', showIndex: true, showMarker: false, proximityRadius: 100, maxShift: 30 } }
export const NoIndex = { args: { accentColor: '#A855F7', showIndex: false, showMarker: true, proximityRadius: 100, maxShift: 30 } }
export const GreenAccent = { args: { accentColor: '#10b981', showIndex: true, showMarker: true, proximityRadius: 80, maxShift: 20, falloff: 'linear' } }
export const LongList = { args: { items: ['Section 1', 'Section 2', 'Section 3', 'Section 4', 'Section 5', 'Section 6', 'Section 7', 'Section 8', 'Section 9', 'Section 10'], accentColor: '#A855F7', showIndex: true, showMarker: true, proximityRadius: 100, maxShift: 30, itemGap: 16, fontSize: 0.9 } }
