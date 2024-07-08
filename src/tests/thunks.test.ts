import axios from 'axios'

import wikiAPI from '../api'
import { getArticles } from '../thunks'
import { type OnThisDayResponseType, type GetPayloadType } from '../types'

jest.mock('../api')
const mockedWikiAPI = jest.mocked(wikiAPI)

describe('thunks', () => {
  it('Should get articles with resolved response', async () => {
    const mockData: OnThisDayResponseType = {
      holidays: [
        {
          text: 'Text',
          pages: [
            {
              content_urls: {
                desktop: {
                  edit: 'edit',
                  page: '2',
                  revisions: 'revisions',
                  talk: 'talk',
                },
                mobile: {
                  edit: 'edit',
                  page: '2',
                  revisions: 'revisions',
                  talk: 'talk',
                },
              },
              description: 'description',
              description_source: 'description_source',
              lang: 'en',
              type: 'standard',
              dir: 'dir',
              extract: '',
              extract_html: '',
              namespace: {
                id: 1,
                text: 'text',
              },
              pageid: 2,
              revision: 'revision',
              tid: 'tid',
              wikibase_item: '',
              timestamp: '',
              originalimage: {
                height: '',
                source: '',
                width: '',
              },
              thumbnail: {
                height: '',
                source: '',
                width: '',
              },
              titles: {
                canonical: '',
                display: '',
                normalized: '',
              },
            },
          ],
        },
      ],
    }
    const dispatch = jest.fn()
    const payload: GetPayloadType = {
      language: 'en',
      type: 'holidays',
      month: '07',
      day: '04',
    }

    mockedWikiAPI.getArticlesOnThisDay.mockResolvedValue({
      data: mockData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: new axios.AxiosHeaders(),
      },
    })

    const thunk = getArticles(payload)
    await thunk(dispatch, undefined, undefined)
    const { calls } = dispatch.mock
    const [start, end] = calls

    expect(calls).toHaveLength(2)
    expect(start[0].type).toBe(
      getArticles.pending(undefined, payload, undefined).type,
    )
    expect(end[0].type).toBe(
      getArticles.fulfilled(undefined, undefined, undefined).type,
    )
    expect(end[0].payload).toBe(mockData)
  })

  it('Should get articles with rejected response', async () => {
    const dispatch = jest.fn()
    const payload: GetPayloadType = {
      language: 'en',
      type: 'holidays',
      month: '07',
      day: '04',
    }

    mockedWikiAPI.getArticlesOnThisDay.mockRejectedValue('Network error')

    const thunk = getArticles(undefined)
    await thunk(dispatch, undefined, undefined)
    const { calls } = dispatch.mock
    const [start, end] = calls

    expect(calls).toHaveLength(2)
    expect(start[0].type).toBe(
      getArticles.pending(undefined, payload, undefined).type,
    )
    expect(end[0].type).toBe(
      getArticles.rejected(undefined, undefined, undefined).type,
    )
    expect(end[0].meta.rejectedWithValue).toBe(true)
    expect(end[0].payload).toBe('Network error')
  })
})
