import { Card, CardHeader, CardFooter, CardTitle, CardContent } from './Card'

const meta = {
  component: Card,
  tags: ['autodocs'],
}

export default meta

export const Default = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card title</CardTitle>
      </CardHeader>
      <CardContent>Card content goes here.</CardContent>
      <CardFooter>
        <button type="button">Action</button>
      </CardFooter>
    </Card>
  ),
}

export const Simple = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Minimal card</CardTitle>
      </CardHeader>
      <CardContent>Just a title and some content.</CardContent>
    </Card>
  ),
}

export const ContentOnly = {
  render: () => <Card>Plain content without slots.</Card>,
}
