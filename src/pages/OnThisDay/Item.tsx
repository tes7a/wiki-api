import { type ReactNode } from 'react'

import { type PropertiesType } from '../../types'
import './styles.scss'

interface ItemProps extends Omit<PropertiesType, 'pages'> {
  children: ReactNode
}

export default function Item(props: ItemProps) {
  const { children, text, year } = props
  return (
    <div className="events__item">
      <div className="events__item-info">
        <span className="events__item-name">Name: {text}</span>
        <span className="events__item-year">Year: {year}</span>
      </div>
      {children}
    </div>
  )
}
