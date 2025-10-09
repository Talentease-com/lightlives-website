import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const impacts = await payload.find({
      collection: 'impacts',
      where: {
        isActive: {
          equals: true
        }
      },
      sort: 'displayOrder',
      limit: 100,
    })

    return NextResponse.json({
      success: true,
      data: impacts.docs,
      total: impacts.totalDocs
    })
  } catch (error) {
    console.error('Error fetching impacts:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch impacts data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour