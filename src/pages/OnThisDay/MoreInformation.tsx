import { type OnThisDayPageType } from '../../types'

export default function MoreInformation(props: { page: OnThisDayPageType }) {
  const { extract, titles } = props.page

  return (
    <div className="events__more-information">
      <span className="events__more-information-title">
        {titles.normalized}
      </span>
      <span className="events__more-information-description">{extract}</span>
    </div>
  )
}
