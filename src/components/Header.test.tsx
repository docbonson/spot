import { render, screen } from '@testing-library/react'
import Header from './Header'

test('renders header with correct elements', () => {
  render(<Header />)

  const homeIcon = screen.getByLabelText('home')
  expect(homeIcon).toBeInTheDocument()

  const homeText = screen.getByText('Home')
  expect(homeText).toBeInTheDocument()

  const settingsIcon = screen.getByLabelText('settings')
  expect(settingsIcon).toBeInTheDocument()

  const userIcon = screen.getByLabelText('user')
  expect(userIcon).toBeInTheDocument()
})
