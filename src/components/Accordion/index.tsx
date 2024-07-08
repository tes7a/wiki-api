import { useState, type ReactNode } from 'react'
import cn from 'classnames'

import { ChevronRightSvg } from '../../assets/icons'
import './styles.scss'

interface AccordionProps {
  title: string
  children: ReactNode
  className?: string
}

export default function Accordion(props: AccordionProps) {
  const { children, title, className } = props
  const [isOpen, setOpen] = useState(false)

  const handleToggleAccordion = () => {
    setOpen(!isOpen)
  }

  return (
    <div>
      <div
        onClick={handleToggleAccordion}
        className={cn('accordion', className, {
          open: isOpen,
        })}
      >
        <h2>{title}</h2>
        <ChevronRightSvg className="accordion__icon" />
      </div>
      {isOpen && <div className="accordion__content">{children}</div>}
    </div>
  )
}
