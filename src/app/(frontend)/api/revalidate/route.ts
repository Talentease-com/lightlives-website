import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Revalidate the root layout which affects all pages
    revalidatePath('/', 'layout')

    return NextResponse.json(
      { message: 'Cache revalidated successfully', revalidated: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error revalidating cache:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate cache', revalidated: false },
      { status: 500 }
    )
  }
}
