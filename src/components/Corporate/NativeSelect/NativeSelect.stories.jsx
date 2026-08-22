import { NativeSelect } from './NativeSelect'

const meta = {
  component: NativeSelect,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
}

export default meta

export const Default = {
  render: () => (
    <NativeSelect defaultValue="apple">
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="cherry">Cherry</option>
    </NativeSelect>
  ),
}

export const Disabled = {
  render: () => (
    <NativeSelect defaultValue="apple" disabled>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
    </NativeSelect>
  ),
}

export const WithDisclaimer = {
  render: () => (
    <NativeSelect defaultValue="plan-basic">
      <option value="plan-basic">Basic</option>
      <option value="plan-pro">Pro</option>
      <option value="plan-enterprise">Enterprise</option>
    </NativeSelect>
  ),
}
