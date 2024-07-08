import axios from 'axios'

import {
  type OnThisDayResponseType,
  type GetPayloadType,
} from '../types/index.js'

const instance = axios.create({
  baseURL: 'https://api.wikimedia.org',
})

const wikiAPI = {
  getArticlesOnThisDay(payload: GetPayloadType) {
    const { day, language = 'en', month, type = 'all' } = payload

    const url = `/feed/v1/wikipedia/${language}/onthisday/${type}/${month}/${day}`

    return instance.get<OnThisDayResponseType>(url)
  },
}

export default wikiAPI
