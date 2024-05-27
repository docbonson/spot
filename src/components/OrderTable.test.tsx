import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' // Import this for better assertions
import OrderTable from './OrderTable'

describe('OrderTable component', () => {
  const orders = [
    {
      id: '1',
      creationDate: '2022-05-01',
      createdBy: 'John',
      orderType: 'Standard',
      customer: 'ACME',
    },
    {
      id: '2',
      creationDate: '2022-05-02',
      createdBy: 'Jane',
      orderType: 'ReturnOrder',
      customer: 'XYZ Corp',
    },
    // Add more sample orders as needed
  ]

  const selectedOrders = ['1']

  const handleSelectOrder = jest.fn()

  test('renders table with correct columns and data', () => {
    render(
      <OrderTable
        orders={orders}
        selectedOrders={selectedOrders}
        handleSelectOrder={handleSelectOrder}
      />,
    )

    // Check if all column headers are present
    expect(screen.getByText('Select')).toBeInTheDocument()
    expect(screen.getByText('Order ID')).toBeInTheDocument()
    expect(screen.getByText('Creation Date')).toBeInTheDocument()
    expect(screen.getByText('Created By')).toBeInTheDocument()
    expect(screen.getByText('Order Type')).toBeInTheDocument()
    expect(screen.getByText('Customer')).toBeInTheDocument()

    // Check if all order data is rendered
    orders.forEach((order) => {
      expect(screen.getByText(order.id)).toBeInTheDocument()
      expect(screen.getByText(order.creationDate)).toBeInTheDocument()
      expect(screen.getByText(order.createdBy)).toBeInTheDocument()
      expect(screen.getByText(order.orderType)).toBeInTheDocument()
      expect(screen.getByText(order.customer)).toBeInTheDocument()
    })
  })
})
