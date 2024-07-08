import { Form } from '../../modules'
import useComponent from './useComponent'
import { Accordion } from '../../components'
import { type OnThisDayCategory } from '../../types'
import MoreInformation from './MoreInformation'
import Item from './Item'
import './styles.scss'

export default function OnThisDayPage() {
  const {
    data: { entries },
  } = useComponent()
  const events = Object.keys(entries)

  if (!events.length) return <Form />

  return (
    <div className="events">
      {events.map((event: OnThisDayCategory, index) => (
        <Accordion title={event.toUpperCase()} key={index}>
          {entries[event].map(({ pages, text, year }, index) => (
            <Item text={text} year={year} key={index}>
              {pages.map((page) => (
                <Accordion
                  title={page.titles.normalized.toUpperCase()}
                  className="events__accordion-more-information"
                  key={page.pageid}
                >
                  <MoreInformation page={page} />
                </Accordion>
              ))}
            </Item>
          ))}
        </Accordion>
      ))}
    </div>
  )
}
