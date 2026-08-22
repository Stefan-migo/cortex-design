import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from './Table'

const meta = {
  component: Table,
  tags: ['autodocs'],
}

export default meta

export const Default = {
  render: () => (
    <Table>
      <TableCaption>Monthly subscription revenue</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Plan</TableHead>
          <TableHead scope="col">Price</TableHead>
          <TableHead scope="col">Customers</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHead scope="row">Starter</TableHead>
          <TableCell>$9</TableCell>
          <TableCell>1,204</TableCell>
        </TableRow>
        <TableRow>
          <TableHead scope="row">Pro</TableHead>
          <TableCell>$29</TableCell>
          <TableCell>812</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>2,016</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

export const HeadersOnly = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Name</TableHead>
          <TableHead scope="col">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Ada Lovelace</TableCell>
          <TableCell>Analyst</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
