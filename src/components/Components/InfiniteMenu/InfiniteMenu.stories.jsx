import { InfiniteMenu } from './InfiniteMenu'
const meta = { component: InfiniteMenu, tags: ['autodocs'], argTypes: { scale: { control: { type: 'range', min: 0.5, max: 2, step: 0.1 } } } }
export default meta
const items = [
  { image: 'https://picsum.photos/seed/im1/900/900?grayscale', link: '#', title: 'First', description: 'The first item' },
  { image: 'https://picsum.photos/seed/im2/900/900?grayscale', link: '#', title: 'Second', description: 'The second item' },
  { image: 'https://picsum.photos/seed/im3/900/900?grayscale', link: '#', title: 'Third', description: 'The third item' },
]
export const Default = { args: { items, scale: 1.0 } }
export const SmallScale = { args: { items, scale: 0.7 } }
export const LargeScale = { args: { items, scale: 1.5 } }
