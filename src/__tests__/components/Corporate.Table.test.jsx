import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '../../components/Corporate/Table/Table'

describe('Corporate Table', () => {
  it('renders a table role', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('exposes the caption as the accessible name', () => {
    render(
      <Table>
        <TableCaption>Invoice totals</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    expect(screen.getByRole('table', { name: 'Invoice totals' })).toBeInTheDocument()
  })

  it('marks column headers with scope=col', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Plan</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    )
    expect(screen.getByRole('columnheader', { name: 'Plan' })).not.toBeNull()
  })

  it('marks row headers with scope=row', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableHead scope="row">Starter</TableHead>
          </TableRow>
        </TableBody>
      </Table>,
    )
    expect(screen.getByRole('rowheader', { name: 'Starter' })).not.toBeNull()
  })

  it('renders cell content', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>$29</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    expect(screen.getByRole('cell', { name: '$29' })).toBeInTheDocument()
  })
})
