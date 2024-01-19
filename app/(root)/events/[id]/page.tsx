import { getEventById } from '@/lib/actions/event.actions'
import { SearchParamProps } from '@/types'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { formatDateTime } from '@/lib/utils'

const EventDetails = async ({ params: { id } }: SearchParamProps) => {
  const event = await getEventById(id)

  return (
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        <Image
          src={event.imageUrl}
          height={1000}
          width={1000}
          alt={`${event.title} image`}
          className="h-full min-h-[300px] object-cover object-center"
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold">{event.title}</h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-2xl bg-green-500/10 px-5 py-2 text-green-700">
                  {event.isFree ? 'FREE' : `$${event.price}`}
                </p>
                <p className="p-medium-16 rounded-2xl bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {event.category.name}
                </p>
              </div>
              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{' '}
                <span className="text-primary">
                  {event.organiser.firstName} {event.organiser.lastName}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={32}
                height={32}
              />
              <div className="p-medium-16 lg:p-regular-20 flex flex-col items-center">
                <p>
                  {formatDateTime(event.startDateTime).dateOnly} -{' '}
                  {formatDateTime(event.startDateTime).timeOnly}
                </p>
                
                <p>
                  {formatDateTime(event.endDateTime).dateOnly} -{' '}
                  {formatDateTime(event.endDateTime).timeOnly}
                </p>
              </div>
            </div>
            <div className="p-regular-20 flex items-center gap-3">
              <Image
                src="/assets/icons/location.svg"
                alt="location"
                width={32}
                height={32}
              />
              <p className="p-medium-16 md:p-regular-20">{event.location}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">What you'll be apart of:</p>
            <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
            <a
              href={event.url}
              target="_blank"
              className="p-medium-16 lg:p-regular-18 truncate text-primary underline"
            >
              {event.url}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
export default EventDetails
