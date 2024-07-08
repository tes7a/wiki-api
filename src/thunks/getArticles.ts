import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import wikiAPI from '../api'
import { type OnThisDayResponseType, type GetPayloadType } from '../types'

export default createAsyncThunk<OnThisDayResponseType, GetPayloadType>(
  'on-this-day/fetchData',
  async (payload: GetPayloadType, { rejectWithValue }) => {
    try {
      const { data } = await wikiAPI.getArticlesOnThisDay(payload)

      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue(error)
    }
  },
)
