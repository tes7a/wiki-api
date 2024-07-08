import { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react'
import cn from 'classnames'

import Loader from '../Loader'
import './styles.scss'

type HTMLButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export interface ButtonProps extends HTMLButtonProps {
  loading?: boolean
}

export default function Button(props: ButtonProps) {
  const { className, loading, disabled, type, children, ...buttonProps } = props

  return (
    <button
      {...buttonProps}
      type={type || 'button'}
      disabled={disabled || loading}
      className={cn('button', className)}
    >
      {loading ? <Loader size="sm" /> : children}
    </button>
  )
}
