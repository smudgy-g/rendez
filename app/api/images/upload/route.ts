import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function uploadImage(file: File): Promise<NextResponse> {
  if (file) {
    const blob = await put(file.name, file, {
      access: 'public',
    })

    return NextResponse.json(blob)
  }

  return NextResponse.json({ message: 'No file provided.' })
}
