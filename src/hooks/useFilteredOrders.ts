import { useState, useMemo } from 'react'

const useFilteredOrders = (orders: any[]) => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedOrderType, setSelectedOrderType] = useState<
    string | undefined
  >(undefined)

  const filteredOrders = useMemo(() => {
    let filtered = orders

    // Filter based on search value
    if (searchValue) {
      const searchLower = searchValue.toLowerCase()
      filtered = filtered.filter((order) =>
        order.id.toLowerCase().includes(searchLower),
      )
    }

    // Filter based on selected order type
    if (selectedOrderType) {
      filtered = filtered.filter(
        (order) => order.orderType === selectedOrderType,
      )
    }

    return filtered
  }, [orders, searchValue, selectedOrderType])

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
  }

  const handleOrderTypeChange = (value: string) => {
    setSelectedOrderType(value)
  }

  return {
    filteredOrders,
    handleSearchChange,
    handleOrderTypeChange,
  }
}

export default useFilteredOrders
