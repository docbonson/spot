import React, { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import OrderTypeFilter from './OrderTypeFilter' // Import the OrderTypeFilter component

interface ModalProps {
  isOpen: boolean
  handleClose: () => void
  handleCreateOrder: (order: any) => void
  orderTypes: string[] // Pass orderTypes as a prop to Modal
  order?: any // Optional prop for editing an existing order
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  handleCreateOrder,
  orderTypes,
  order, // Optional prop for editing an existing order
}) => {
  const [editedOrder, setEditedOrder] = useState({
    id: '',
    creationDate: '',
    createdBy: '',
    customer: '',
    orderType: '',
  })

  useEffect(() => {
    if (order) {
      // If an existing order is provided, populate the state with its data
      setEditedOrder(order)
    } else {
      // If creating a new order, reset the state
      setEditedOrder({
        id: '',
        creationDate: '',
        createdBy: '',
        customer: '',
        orderType: '',
      })
    }
  }, [order])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedOrder((prevState) => ({
      ...prevState,
      [name || '']: value,
    }))
  }

  const handleSubmit = () => {
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const newOrder = {
      ...editedOrder,
      id: order ? editedOrder.id : uuidv4(), // If editing, retain the original ID; otherwise, generate a new one
      creationDate: formattedDate,
    }
    handleCreateOrder(newOrder)
    handleClose()
  }

  const handleOrderTypeChange = (value: string) => {
    setEditedOrder((prevState) => ({
      ...prevState,
      orderType: value,
    }))
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{order ? 'Edit Order' : 'Create New Order'}</DialogTitle>
      <DialogContent>
        <TextField
          type="datetime-local"
          name="creationDate"
          value={editedOrder.creationDate}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Created By"
          name="createdBy"
          value={editedOrder.createdBy}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Customer"
          name="customer"
          value={editedOrder.customer}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <OrderTypeFilter
          orderTypes={orderTypes}
          selectedOrderType={editedOrder.orderType}
          handleOrderTypeChange={handleOrderTypeChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>
          {order ? 'Save Changes' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal
