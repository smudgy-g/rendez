'use server'

import { CreateEventParams } from '@/types'
import { connectToDB } from '../database'
import User from '../database/models/user.model'
import { handleError } from '../utils'
import Event from '../database/models/event.model'

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
    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    handleError(error)
  }
}
