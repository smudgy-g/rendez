import EventForm from '@/components/shared/EventForm'
import { auth } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import React from 'react'

const UpdateEvent = () => {
  const { sessionClaims } = auth()
  const { id } = useParams()

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
          userId={userId}
          // enet={event}
          type="Update"
        />
      </div>
    </>
  )
}

export default UpdateEvent
