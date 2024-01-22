'use server'

import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByUserParams,
} from '@/types'
import { handleError } from '../utils'
import { connectToDB } from '../database'
import Order from '../database/models/order.model'
import Event from '../database/models/event.model'
import User from '../database/models/user.model'
import Stripe from 'stripe'
import { redirect } from 'next/navigation'

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

  const price = order.isFree ? 0 : Number(order.price) * 100

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    })
    redirect(session.url!)
  } catch (error) {
    handleError(error)
  }
}

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDB()

    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    })

    return JSON.parse(JSON.stringify(newOrder))
  } catch (error) {
    handleError(error)
  }
}

export const getOrdersByUser = async ({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams) => {
  try {
    await connectToDB()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await Order.distinct('event._id')
      .find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'event',
        model: Event,
        populate: {
          path: 'organizer',
          model: User,
          select: '_id firstName lastName',
        },
      })

    const ordersCount = await Order.distinct('event._id').countDocuments(
      conditions
    )

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}
