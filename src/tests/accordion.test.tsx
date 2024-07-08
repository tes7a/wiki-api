import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Accordion } from '../components'

jest.mock('src/assets/icons', () => ({
  __esModule: true,
  ChevronRightSvg: ({ className }: { className?: string }) => (
    <div data-testid="chevron-icon" className={className} />
  ),
}))

describe('Accordion component', () => {
  it('renders with title and children', () => {
    render(<Accordion title="Test Title">Test Content</Accordion>)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })

  it('toggles content visibility on click', () => {
    render(<Accordion title="Test Title">Test Content</Accordion>)
    const titleElement = screen.getByText('Test Title')
    fireEvent.click(titleElement)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeVisible()

    fireEvent.click(titleElement)
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Accordion title="Test Title" className="custom-class">
        Test Content
      </Accordion>,
    )
    const accordionElement = screen.getByText('Test Title').parentElement
    expect(accordionElement).toHaveClass('accordion custom-class')
  })

  it('renders ChevronRightSvg icon', () => {
    render(<Accordion title="Test Title">Test Content</Accordion>)
    expect(screen.getByTestId('chevron-icon')).toBeInTheDocument()
  })
})
