import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
}

export default meta

export const Default = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p>Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p>Change your password here.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p>Adjust your preferences here.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const Controlled = {
  render: () => (
    <Tabs value="profile">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <p>Profile settings.</p>
      </TabsContent>
      <TabsContent value="billing">
        <p>Billing settings.</p>
      </TabsContent>
    </Tabs>
  ),
}
