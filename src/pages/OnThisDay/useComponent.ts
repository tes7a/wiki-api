import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { type RootState } from '../../store'

export default function useComponent() {
  const { entries, error } = useSelector(
    (state: RootState) => state.onThisDayReducer,
  )

  useEffect(() => {
    toast(error, {
      position: 'top-center',
      autoClose: 5000,
    })
  }, [error])

  return {
    data: { entries },
  }
}
