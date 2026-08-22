import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/Corporate/Tabs/Tabs'

const renderTabs = () =>
  render(
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account panel</TabsContent>
      <TabsContent value="password">Password panel</TabsContent>
      <TabsContent value="settings">Settings panel</TabsContent>
    </Tabs>,
  )

describe('Corporate Tabs', () => {
  it('exposes tablist, tab, and tabpanel roles', () => {
    renderTabs()
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Account' })).toBeInTheDocument()
    expect(screen.getByRole('tabpanel', { name: 'Account' })).toBeInTheDocument()
  })

  it('marks only the active tab aria-selected and keeps others unselected', () => {
    renderTabs()
    const account = screen.getByRole('tab', { name: 'Account' })
    const password = screen.getByRole('tab', { name: 'Password' })
    expect(account).toHaveAttribute('aria-selected', 'true')
    expect(password).toHaveAttribute('aria-selected', 'false')
  })

  it('puts only the active tab into the tab order (roving tabindex)', () => {
    renderTabs()
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute('tabindex', '-1')
  })

  it('shows only the active tabpanel content', () => {
    renderTabs()
    expect(screen.getByRole('tabpanel', { name: 'Account' })).toHaveTextContent('Account panel')
    expect(screen.queryByText('Password panel')).not.toBeInTheDocument()
  })

  it('roves focus with ArrowRight and updates aria-selected when activated', async () => {
    const user = userEvent.setup()
    renderTabs()
    await user.tab()
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveFocus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Password' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tabpanel', { name: 'Password' })).toHaveTextContent('Password panel')
  })

  it('roves focus in reverse with ArrowLeft', async () => {
    const user = userEvent.setup()
    renderTabs()
    await user.tab()
    await user.keyboard('{ArrowRight}')
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveFocus()
  })

  it('jumps to the last tab with End and first with Home', async () => {
    const user = userEvent.setup()
    renderTabs()
    await user.tab()
    await user.keyboard('{End}')
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveFocus()
    await user.keyboard('{Home}')
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveFocus()
  })

  it('activates a tab on click', async () => {
    const user = userEvent.setup()
    renderTabs()
    await user.click(screen.getByRole('tab', { name: 'Settings' }))
    expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel', { name: 'Settings' })).toHaveTextContent('Settings panel')
  })
})
