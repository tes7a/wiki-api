import onThisDayReducer, {
  type InitialStateType,
} from '../reducers/on-this-day'
import { getArticles } from '../thunks'
import { type OnThisDayResponseType } from '../types'

const initialState: InitialStateType = {
  entries: {},
  error: undefined,
  loading: true,
}

describe('on this day reducer', () => {
  it('Should be change loading with "getArticles.pending" action', () => {
    const state = onThisDayReducer(
      initialState,
      getArticles.pending(undefined, undefined),
    )
    expect(state.loading).toBe(true)
    expect(state.error).toBeUndefined()
  })

  it('Should be fetch articles with "getArticles.fulfilled" action', () => {
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
    const state = onThisDayReducer(
      initialState,
      getArticles.fulfilled(mockData, undefined, undefined),
    )
    expect(state.entries).toEqual(mockData)
    expect(state.loading).toBe(false)
    expect(state.error).toBeUndefined()
  })

  it('Should be change error status with "getArticles.rejected" action', () => {
    const state = onThisDayReducer(
      initialState,
      getArticles.rejected(Error('Error'), undefined, undefined),
    )
    expect(state.error).toEqual('Error')
    expect(state.loading).toBe(false)
  })
})
