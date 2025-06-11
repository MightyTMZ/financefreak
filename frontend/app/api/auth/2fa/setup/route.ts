import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth'
import QRCode from 'qrcode'

export async function POST(request: NextRequest) {
  try {
    // Get user from auth token (you'd implement this middleware)
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

    const result = await AuthService.enable2FA(tokenData.userId)
    if (!result) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Generate QR code image
    const qrCodeImage = await QRCode.toDataURL(result.qrCode)

    return NextResponse.json({
      secret: result.secret,
      qrCode: qrCodeImage
    })
  } catch (error) {
    console.error('2FA setup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}