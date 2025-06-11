import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { AuthService } from '@/lib/auth'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  twoFactorToken: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    // Find user
    const user = await AuthService.getUserByEmail(validatedData.email)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await AuthService.verifyPassword(validatedData.password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return NextResponse.json(
        { error: 'Please verify your email address before logging in' },
        { status: 401 }
      )
    }

    // Check 2FA if enabled
    if (user.twoFactorEnabled) {
      if (!validatedData.twoFactorToken) {
        return NextResponse.json(
          { error: 'Two-factor authentication code required', requiresTwoFactor: true },
          { status: 200 }
        )
      }

      const is2FAValid = AuthService.verify2FAToken(validatedData.twoFactorToken, user.twoFactorSecret!)
      if (!is2FAValid) {
        return NextResponse.json(
          { error: 'Invalid two-factor authentication code' },
          { status: 401 }
        )
      }
    }

    // Generate JWT token
    const { password, ...userWithoutPassword } = user
    const token = AuthService.generateToken(userWithoutPassword)

    // Set HTTP-only cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: userWithoutPassword
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}