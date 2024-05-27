import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TableSortLabel,
} from '@mui/material'

interface Order {
  id: string
  creationDate: string
  createdBy: string
  orderType: string
  customer: string
}

interface OrderTableProps {
  orders: Order[]
  selectedOrders: string[]
  handleSelectOrder: (orderId: string) => void
}

interface Column {
  id: keyof Order
  label: string
}

const columns: Column[] = [
  { id: 'id', label: 'Order ID' },
  { id: 'creationDate', label: 'Creation Date' },
  { id: 'createdBy', label: 'Created By' },
  { id: 'orderType', label: 'Order Type' },
  { id: 'customer', label: 'Customer' },
]

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  selectedOrders,
  handleSelectOrder,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 'larger' }}>
              Select
            </TableCell>
            {columns.map(({ id, label }) => (
              <TableCell
                key={id}
                sx={{ fontWeight: 'bold', fontSize: 'larger' }}
              >
                <TableSortLabel>{label}</TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                No Results
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                  />
                </TableCell>
                {columns.map(({ id }) => (
                  <TableCell key={id}>{order[id]}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderTable
