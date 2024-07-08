import { createSlice } from '@reduxjs/toolkit'

import { getArticles } from '../thunks'
import { type OnThisDayResponseType } from '../types'

export interface InitialStateType {
  entries: undefined | OnThisDayResponseType
  error: string | undefined
  loading: boolean
}

const initialState: InitialStateType = {
  entries: {},
  error: undefined,
  loading: false,
}

export default createSlice({
  name: 'on-this-day',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.loading = false
        state.entries = {
          ...action.payload,
          ...(action.payload.births && {
            births: action.payload.births.sort((a, b) => a.year - b.year),
          }),
          ...(action.payload.deaths && {
            deaths: action.payload.deaths.sort((a, b) => a.year - b.year),
          }),
          ...(action.payload.events && {
            events: action.payload.events.sort((a, b) => a.year - b.year),
          }),
          ...(action.payload.selected && {
            selected: action.payload.selected.sort((a, b) => a.year - b.year),
          }),
        }
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.error = action.error.message || null
        state.loading = false
      })
  },
}).reducer
