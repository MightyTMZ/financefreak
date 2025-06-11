import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { AuthService } from '@/lib/auth'

const disableSchema = z.object({
  token: z.string().length(6, 'Token must be 6 digits')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = disableSchema.parse(body)

    // Get user from auth token
    const authToken = request.cookies.get('auth-token')?.value
    if (!authToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const tokenData = AuthService.verifyToken(authToken)
    if (!tokenData) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      )
    }

    const isDisabled = await AuthService.disable2FA(tokenData.userId, validatedData.token)
    
    if (isDisabled) {
      return NextResponse.json({
        message: 'Two-factor authentication disabled successfully'
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      )
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('2FA disable error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}