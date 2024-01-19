'use server'

import { CreateEventParams, DeleteEventParams, GetAllEventsParams } from '@/types'
import { connectToDB } from '../database'
import User from '../database/models/user.model'
import { handleError } from '../utils'
import Event from '../database/models/event.model'
import { revalidatePath } from 'next/cache'
import Category from '../database/models/category.model'

const populateEvent = async (query: any) => {
  return query
    .populate({
      path: 'organiser',
      model: User,
      select: '_id firstName lastName',
    })
    .populate({ path: 'category', model: Category, select: '_id name' })
}
export const createEvent = async ({
  userId,
  event,
  path,
}: CreateEventParams) => {
  try {
    await connectToDB()

    const organiser = await User.findById(userId)

    if (!organiser) throw new Error('No organiser found with userId')

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organiser: userId,
    })

    revalidatePath(path)

    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    handleError(error)
  }
}

export const getEventById = async (eventId: string) => {
  try {
    await connectToDB()

    const event = await populateEvent(Event.findById(eventId))

    if (!event) throw new Error(`Could not find event: eventId: ${eventId}`)

    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    handleError(error)
  }
}

export const deleteEvent = async ({eventId, path}: DeleteEventParams) => {
  try {
    await connectToDB()

    const deletedEvent = await Event.findByIdAndDelete(eventId)

    if (deletedEvent) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

export const getAllEvents = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) => {
  try {
    await connectToDB()
    const conditions = {}
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(0)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

