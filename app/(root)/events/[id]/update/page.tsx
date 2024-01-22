import EventForm from '@/components/shared/EventForm'
import { getEventById } from '@/lib/actions/event.actions'
import { auth } from '@clerk/nextjs'
import React from 'react'

type UpdateEventProps = {
  params: {
    id: string
  }
}

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth()
  const event = await getEventById(id)
  const userId = sessionClaims?.userId as string

  // const event = await getEventById()
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-canter py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm
          type="UPDATE"
          event={event}
          userId={userId}
          eventId={event._id}
        />
      </div>
    </>
  )
}

export default UpdateEvent
