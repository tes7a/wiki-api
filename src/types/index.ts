export type OnThisDayCategory =
  | 'selected'
  | 'births'
  | 'deaths'
  | 'events'
  | 'holidays'

export type OnThisDayResponseType = Partial<
  Record<OnThisDayCategory, PropertiesType[]>
>

export interface PropertiesType {
  text: string
  year?: number
  pages: OnThisDayPageType[]
}

export interface OnThisDayPageType {
  type: ArticlePagesType
  namespace: ArticleNamespace
  wikibase_item: string
  titles: ArticleTitles
  pageid: number
  thumbnail: ImageType
  originalimage: ImageType
  lang: string
  dir: string
  revision: string
  tid: string
  timestamp: string
  description: string
  description_source: string
  content_urls: ArticleContentUrls
  extract: string
  extract_html: string
}

interface ArticleNamespace {
  id: number
  text: string
}

interface ArticleTitles {
  canonical: string
  normalized: string
  display: string
}

interface ImageType {
  source: string
  width: string
  height: string
}

interface ArticleContentUrls {
  desktop: UrlType
  mobile: UrlType
}

interface UrlType {
  page: string
  revisions: string
  edit: string
  talk: string
}

export interface GetPayloadType {
  language?: RequestLanguageType
  type?: RequestType
  month: string
  day: string
}

type ArticlePagesType =
  | 'standard'
  | 'disambiguation'
  | 'no-extract'
  | 'mainpage'

export type RequestLanguageType =
  | 'en'
  | 'de'
  | 'fr'
  | 'sv'
  | 'pt'
  | 'ru'
  | 'es'
  | 'ar'
  | 'bs'

export type RequestType =
  | 'all'
  | 'selected'
  | 'births'
  | 'deaths'
  | 'holidays'
  | 'events'
