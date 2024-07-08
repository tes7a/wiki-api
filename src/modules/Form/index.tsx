import DatePicker from 'react-datepicker'

import { Button, Dropdown } from '../../components'
import useComponent from './useComponent'
import FormField from './FormField'
import './styles.scss'

export default function Form() {
  const {
    data: {
      startDate,
      languages,
      types,
      formData: { language, type },
      loading,
    },
    handlers: {
      handlePickLanguage,
      handlePickType,
      handlePickDate,
      handleSendDate,
    },
  } = useComponent()

  return (
    <div className="form">
      <span className="form__caption">
        This mini-application is created based on the "On this day" query using
        the Wikipedia API. Below, in the form, you can select the day/month you
        are interested in, the language in which the information will be
        displayed, and the type of data.
      </span>
      <div className="form__selectors">
        <Dropdown
          className="form__language"
          options={languages}
          onSelect={handlePickLanguage}
        >
          <FormField value={language} />
        </Dropdown>
        <Dropdown
          className="form__type"
          options={types}
          onSelect={handlePickType}
        >
          <FormField value={type} />
        </Dropdown>
        <div className="form__date">
          <DatePicker
            selected={startDate}
            onChange={handlePickDate}
            locale={language}
            placeholderText="DD/MM/YYYY"
            dateFormat="dd MMMM"
          />
        </div>
      </div>
      <Button
        onClick={handleSendDate}
        loading={loading}
        className="from__submit"
      >
        Submit
      </Button>
    </div>
  )
}
