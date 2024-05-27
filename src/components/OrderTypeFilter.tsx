import React, { useState } from 'react'
import { Select, MenuItem, SelectChangeEvent } from '@mui/material'

interface OrderTypeFilterProps {
  orderTypes: string[]
  selectedOrderType: string | undefined
  handleOrderTypeChange: (value: string) => void
}

const OrderTypeFilter: React.FC<OrderTypeFilterProps> = ({
  orderTypes,
  selectedOrderType,
  handleOrderTypeChange,
}) => {
  const [selectedType, setSelectedType] = useState(selectedOrderType)

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value
    setSelectedType(value)
    handleOrderTypeChange(value)
  }

  return (
    <Select value={selectedType || ''} onChange={handleChange} displayEmpty>
      <MenuItem value="">Order Type</MenuItem>
      {orderTypes.map((type, index) => (
        <MenuItem key={index} value={type}>
          {type}
        </MenuItem>
      ))}
    </Select>
  )
}

export default OrderTypeFilter
