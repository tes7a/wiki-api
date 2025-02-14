import { type ReactElement } from 'react'
import cn from 'classnames'

export interface Option {
  value: string
  label: string
  disabled?: boolean
  leftIcon?: ReactElement
  rightIcon?: ReactElement
}

interface DropdownOptionProps extends Option {
  onSelect: (value: string) => void
}

export default function DropdownOption({
  label,
  value,
  disabled,
  leftIcon,
  rightIcon,
  onSelect,
}: DropdownOptionProps) {
  return (
    <li
      className={cn('dropdown__option', {
        'dropdown__option--disabled': disabled,
      })}
      onClick={() => {
        !disabled && onSelect(value)
      }}
    >
      <span className="dropdown__label">
        {leftIcon}
        {label}
      </span>
      {rightIcon}
    </li>
  )
}
