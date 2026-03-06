import { NextResponse } from 'next/server'
import { prisma } from '@kodkong/database'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    const payload = getCurrentUser()
    if (!payload) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHENTICATED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        isEmailVerified: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, data: { user } },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Me Error]', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } },
      { status: 500 }
    )
  }
}

