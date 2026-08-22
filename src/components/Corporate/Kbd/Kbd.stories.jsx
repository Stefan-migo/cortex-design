import { Kbd } from './Kbd'

const meta = {
  component: Kbd,
  tags: ['autodocs'],
}

export default meta

export const Default = {
  args: { children: '⌘ K' },
}

export const Modifiers = {
  render: () => (
    <span>
      <Kbd>⌘</Kbd> <Kbd>⇧</Kbd> <Kbd>P</Kbd>
    </span>
  ),
}

export const WithText = {
  render: () => (
    <span>
      Press <Kbd>Enter</Kbd> to continue
    </span>
  ),
}
