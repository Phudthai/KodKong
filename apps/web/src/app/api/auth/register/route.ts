import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@kodkong/database'
import { registerSchema } from '@kodkong/shared'
import { signToken, setAuthCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const result = registerSchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.issues.map((i) => ({
        field: i.path.join('.'),
        message: i.message,
      }))
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: { errors } } },
        { status: 400 }
      )
    }

    const { email, password, name, phone } = result.data

    // Check for existing user
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { success: false, error: { code: 'EMAIL_EXISTS', message: 'An account with this email already exists' } },
        { status: 409 }
      )
    }

    // Hash password and create user
    const hashedPassword = await hash(password, 12)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone: phone ?? null,
        role: 'CUSTOMER',
        isEmailVerified: false,
        isActive: true,
      },
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

    // Create JWT & set cookie
    const token = signToken({ userId: user.id, email: user.email, role: user.role })
    setAuthCookie(token)

    return NextResponse.json(
      { success: true, data: { user }, message: 'Account created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('[Register Error]', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Something went wrong. Please try again.' } },
      { status: 500 }
    )
  }
}

