import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Loader } from '../components'

jest.mock('src/assets/icons', () => ({
  __esModule: true,
  SpinnerSVG: ({ className }: { className?: string }) => (
    <div data-testid="spinner" className={className} />
  ),
}))

describe('Loader component', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<Loader />)
    const spinner = getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('spinner md')
  })

  it('applies the correct className and size', () => {
    const { getByTestId } = render(
      <Loader className="custom-class" size="lg" />,
    )
    const spinner = getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('spinner lg custom-class')
  })

  it('applies only size class when no additional className is provided', () => {
    const { getByTestId } = render(<Loader size="sm" />)
    const spinner = getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('spinner sm')
  })
})
