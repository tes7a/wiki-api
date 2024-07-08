import { DownSVG } from '../../assets/icons'
import './styles.scss'

interface FormFieldProps {
  value: string
}

export default function FormField(props: FormFieldProps) {
  const { value } = props
  return (
    <div className="form-field">
      <span>{value}</span>
      <DownSVG className="form-field__icon" />
    </div>
  )
}
