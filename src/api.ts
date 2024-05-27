const apiKey = process.env.REACT_APP_API_KEY
const apiUrl = 'https://red-candidate-web.azurewebsites.net'

const fetchOrders = async () => {
  try {
    const headers = new Headers()
    headers.append('ApiKey', apiKey || '') // Ensure apiKey is not undefined

    const response = await fetch(`${apiUrl}/api/orders`, {
      headers: headers,
    })

    const data = await response.json()
    console.log('Fetched orders:', data)

    // Map the response data to match the structure of the orders array
    const orders = data.map((order: any) => ({
      id: order.orderId,
      creationDate: order.createdDate,
      createdBy: order.createdByUserName,
      orderType: order.orderType,
      customer: order.customerName,
    }))

    return orders
  } catch (error) {
    console.error('Error fetching orders:', error)
    return []
  }
}

export default fetchOrders
