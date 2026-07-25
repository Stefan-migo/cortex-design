import { StickerPeel } from './StickerPeel'

const meta = {
  component: StickerPeel,
  tags: ['autodocs'],
  argTypes: {
    peelColor: { control: 'color' },
    peelSize: { control: { type: 'range', min: 10, max: 80, step: 5 } },
    hoverOnly: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta

export const Default = {
  args: {
    children: <div style={{ padding: '2em', background: '#1a1a2e', color: '#fff', borderRadius: 8, width: 240 }}>Hover to peel</div>,
    peelColor: '#f0f0f0',
    peelSize: 30,
    hoverOnly: true,
  },
}

export const LargePeel = {
  args: {
    children: <div style={{ padding: '2em', background: '#1a1a2e', color: '#fff', borderRadius: 8, width: 240 }}>Large peel corner</div>,
    peelColor: '#f0f0f0',
    peelSize: 50,
    hoverOnly: true,
  },
}

export const DarkPeel = {
  args: {
    children: <div style={{ padding: '2em', background: '#1a1a2e', color: '#fff', borderRadius: 8, width: 240 }}>Dark peel</div>,
    peelColor: '#2a2a4a',
    peelSize: 30,
    hoverOnly: true,
  },
}

export const NoHover = {
  args: {
    children: <div style={{ padding: '2em', background: '#1a1a2e', color: '#fff', borderRadius: 8, width: 240 }}>Always peeled</div>,
    peelColor: '#f0f0f0',
    peelSize: 30,
    hoverOnly: false,
  },
}
