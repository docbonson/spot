import React, { useState, useEffect } from 'react'
import { Box, Button, Grid, IconButton, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import useFilteredOrders from '../hooks/useFilteredOrders'
import OrderTable from './OrderTable'
import OrderTypeFilter from './OrderTypeFilter'
import Modal from './Modal'
import fetchOrders from '../api'

const orderTypes = [
  'Standard',
  'ReturnOrder',
  'TransferOrder',
  'SaleOrder',
  'PurchaseOrder',
]

const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false) // State to control modal visibility
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const {
    filteredOrders,
    handleSearchChange,
    handleOrderTypeChange,
  } = useFilteredOrders(orders)

  useEffect(() => {
    const fetchOrdersData = async () => {
      const ordersData = await fetchOrders()
      setOrders(ordersData)
    }
    fetchOrdersData()
  }, [])

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(orderId)
        ? prevSelected.filter((id) => id !== orderId)
        : [...prevSelected, orderId],
    )
  }

  const handleDeleteOrders = () => {
    const updatedOrders = orders.filter(
      (order) => !selectedOrders.includes(order.id),
    )
    setOrders(updatedOrders)
    setSelectedOrders([])
  }

  const handleCreateOrder = (order: any) => {
    setOrders((prevOrders) => [...prevOrders, order])
    setIsModalOpen(false) // Close the modal after creating the order
  }

  return (
    <Box paddingTop={2}>
      <div>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              label="Search by Order ID"
              onChange={(e) => handleSearchChange(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton sx={{ bgcolor: '#0066cc', color: 'white' }}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <Button
              startIcon={<AddIcon />}
              onClick={() => setIsModalOpen(true)}
              sx={{ bgcolor: '#0066cc', color: 'white' }}
            >
              Create Order
            </Button>
          </Grid>
          <Grid item>
            <Button
              startIcon={<DeleteIcon />}
              onClick={handleDeleteOrders}
              sx={{ bgcolor: '#0066cc', color: 'white' }}
            >
              Delete Selected
            </Button>
          </Grid>
          <Grid item>
            <OrderTypeFilter
              orderTypes={orderTypes}
              selectedOrderType={''}
              handleOrderTypeChange={handleOrderTypeChange}
            />
          </Grid>
        </Grid>
        <OrderTable
          orders={filteredOrders}
          selectedOrders={selectedOrders}
          handleSelectOrder={handleSelectOrder}
        />
        <Modal
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          handleCreateOrder={handleCreateOrder}
          orderTypes={orderTypes}
        />
      </div>
    </Box>
  )
}

export default OrderListPage
