import { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip'

const meta = {
  component: Tooltip,
  tags: ['autodocs'],
}

export default meta

export const Default = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>This is a tooltip</TooltipContent>
    </Tooltip>
  ),
}

export const Bordered = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Learn more</TooltipTrigger>
      <TooltipContent>Keyboard: focus shows, Esc hides</TooltipContent>
    </Tooltip>
  ),
}
