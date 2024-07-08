import wikiAPI from '../api'
import { type GetPayloadType } from '../types'

describe('wikiAPI', () => {
  it("Should return data from wiki 'One This Day' API", async () => {
    const payload: GetPayloadType = {
      language: 'en',
      type: 'all',
      month: '07',
      day: '04',
    }

    const response = await wikiAPI.getArticlesOnThisDay(payload)

    expect(response.status).toBe(200)
    expect(response.data).toHaveProperty('events')
    expect(response.data).toHaveProperty('births')
    expect(response.data).toHaveProperty('deaths')
    expect(response.data).toHaveProperty('holidays')
    expect(response.data).toHaveProperty('selected')
  })
})
