import { useState } from 'react'
import { useSelector } from 'react-redux'

import { type RootState, useAppDispatch } from '../../store'
import { getArticles } from '../../thunks'
import {
  type RequestType,
  type GetPayloadType,
  type RequestLanguageType,
} from '../../types'

export default function useComponent() {
  const date = new Date()

  const getFormattedDate = (date: Date) => {
    let day = date.getDate().toString()
    let month = (date.getMonth() + 1).toString()

    day = Number(day) < 10 ? '0' + day : day.toString()
    month = Number(month) < 10 ? '0' + month : month.toString()

    return { day, month }
  }

  const dispatch = useAppDispatch()
  const [startDate, setStartDate] = useState(new Date())
  const [formData, setFormData] = useState<GetPayloadType | null>({
    day: getFormattedDate(date).day,
    month: getFormattedDate(date).month,
    language: 'en',
    type: 'all',
  })
  const { loading } = useSelector((state: RootState) => state.onThisDayReducer)

  const languages = ['en', 'de', 'fr', 'sv', 'pt', 'ru', 'es', 'ar', 'bs']
  const types = ['all', 'selected', 'births', 'deaths', 'holidays', 'events']

  const handlePickType = (type: RequestType) => {
    setFormData((state) => ({ ...state, type }))
  }

  const handlePickLanguage = (language: RequestLanguageType) => {
    setFormData((state) => ({ ...state, language }))
  }

  const handlePickDate = (date: Date) => {
    setStartDate(date)
    if (date) {
      setFormData((state) => ({
        ...state,
        day: getFormattedDate(date).day,
        month: getFormattedDate(date).month,
      }))
    }
  }

  const handleSendDate = async () => {
    await dispatch(getArticles(formData))
  }

  return {
    data: {
      startDate,
      formData,
      languages: languages.map((language) => ({
        label: language,
        value: language,
      })),
      types: types.map((type) => ({ label: type, value: type })),
      loading,
    },
    handlers: {
      handlePickType,
      handlePickLanguage,
      handlePickDate,
      handleSendDate,
    },
  }
}
