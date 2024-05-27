import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import OrderListPage from './OrderListPage'

describe('OrderListPage', () => {
  test('renders correctly', () => {
    render(<OrderListPage />)

    expect(screen.getByLabelText('Search by Order ID')).toBeInTheDocument()
    expect(screen.getByText('Create Order')).toBeInTheDocument()
    expect(screen.getByText('Delete Selected')).toBeInTheDocument()
  })

  test('search input field', async () => {
    render(<OrderListPage />)
    const searchInput = screen.getByLabelText('Search by Order ID')

    fireEvent.change(searchInput, { target: { value: '123' } })

    await waitFor(() => {
      expect(searchInput).toHaveValue('123')
    })
  })

  test('create order modal', async () => {
    render(<OrderListPage />)
    const createOrderButton = screen.getByText('Create Order')

    fireEvent.click(createOrderButton)

    await waitFor(() => {
      expect(screen.getByText('Create New Order')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Cancel'))

    await waitFor(() => {
      expect(screen.queryByText('Create New Order')).not.toBeInTheDocument()
    })
  })
})
