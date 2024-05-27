import React from 'react'
import OrderListPage from './components/OrderListPage'
import Header from './components/Header'

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <OrderListPage />
    </div>
  )
}

export default App
