import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Button } from '../components'

jest.mock('../components/Loader', () => ({
  __esModule: true,
  default: () => <div data-testid="loader" />,
}))

describe('Button component', () => {
  it('renders the button with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies the correct className', () => {
    render(<Button className="custom-class">Click me</Button>)
    expect(screen.getByText('Click me')).toHaveClass('button custom-class')
  })

  it('disables the button when loading is true', () => {
    render(<Button loading>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('disables the button when disabled is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows the loader when loading is true', () => {
    render(<Button loading>Click me</Button>)
    expect(screen.queryByText('Click me')).not.toBeInTheDocument()
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('does not show the loader when loading is false', () => {
    render(<Button loading={false}>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
  })

  it('triggers onClick event when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('sets the correct default type to button', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('overrides the type attribute when specified', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })
})
