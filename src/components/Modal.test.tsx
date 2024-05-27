import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Modal from './Modal'

describe('Modal component', () => {
  const handleClose = jest.fn()
  const handleCreateOrder = jest.fn()

  const orderTypes = [
    'Standard',
    'ReturnOrder',
    'TransferOrder',
    'SaleOrder',
    'PurchaseOrder',
  ]

  const defaultProps = {
    isOpen: true,
    handleClose,
    handleCreateOrder,
    orderTypes,
  }

  test('renders with default props', () => {
    render(<Modal {...defaultProps} />)

    expect(screen.getByText('Create New Order')).toBeInTheDocument()
    expect(screen.getByLabelText('Created By')).toBeInTheDocument()
    expect(screen.getByLabelText('Customer')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Create')).toBeInTheDocument()
  })

  test('submits form with correct data', () => {
    render(<Modal {...defaultProps} />)

    const createdByInput = screen.getByLabelText('Created By')
    const customerInput = screen.getByLabelText('Customer')

    fireEvent.change(createdByInput, { target: { value: 'John Doe' } })
    fireEvent.change(customerInput, { target: { value: 'ACME Corporation' } })

    fireEvent.click(screen.getByText('Create'))

    expect(handleCreateOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        createdBy: 'John Doe',
        customer: 'ACME Corporation',
        orderType: '',
      }),
    )
  })

  test('calls handleClose when cancel button is clicked', () => {
    render(<Modal {...defaultProps} />)

    fireEvent.click(screen.getByText('Cancel'))

    expect(handleClose).toHaveBeenCalled()
  })
})
