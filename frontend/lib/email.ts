import nodemailer from 'nodemailer'

// Check if email configuration is available
const isEmailConfigured = () => {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  )
}

// Create transporter only if email is configured
const createTransporter = () => {
  if (!isEmailConfigured()) {
    return null
  }

  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Add timeout and connection options
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 5000, // 5 seconds
    socketTimeout: 10000, // 10 seconds
  })
}

export class EmailService {
  static async sendVerificationEmail(email: string, token: string): Promise<void> {
    // In development, if email is not configured, just log the verification URL
    if (!isEmailConfigured()) {
      const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/verify-email?token=${token}`
      console.log('\n=== EMAIL VERIFICATION ===')
      console.log(`Email would be sent to: ${email}`)
      console.log(`Verification URL: ${verificationUrl}`)
      console.log('=========================\n')
      
      // In development, we'll consider this "successful" even without sending
      if (process.env.NODE_ENV === 'development') {
        return
      }
      
      throw new Error('Email configuration is missing. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.')
    }

    const transporter = createTransporter()
    if (!transporter) {
      throw new Error('Failed to create email transporter')
    }

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/verify-email?token=${token}`
    
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@stocksim.com',
      to: email,
      subject: 'Verify your StockSim account',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1f2937; margin: 0;">StockSim</h1>
            <p style="color: #6b7280; margin: 5px 0;">Virtual Stock Market Game</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">Welcome to StockSim!</h2>
            <p style="color: #374151; line-height: 1.6;">
              Thank you for signing up for StockSim. To complete your registration and start trading with virtual money, please verify your email address by clicking the button below.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" style="background: #1f2937; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 0;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href="${verificationUrl}" style="color: #3b82f6; word-break: break-all;">${verificationUrl}</a>
            </p>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 12px;">
            <p>This verification link will expire in 24 hours.</p>
            <p>If you didn't create an account with StockSim, you can safely ignore this email.</p>
          </div>
        </div>
      `,
    }

    try {
      await transporter.sendMail(mailOptions)
      console.log(`Verification email sent successfully to ${email}`)
    } catch (error) {
      console.error('Failed to send verification email:', error)
      
      // In development, provide helpful error message
      if (process.env.NODE_ENV === 'development') {
        console.log('\n=== EMAIL CONFIGURATION HELP ===')
        console.log('To enable email sending in development:')
        console.log('1. Copy .env.example to .env')
        console.log('2. Configure your SMTP settings:')
        console.log('   - For Gmail: Use App Password (not regular password)')
        console.log('   - SMTP_HOST=smtp.gmail.com')
        console.log('   - SMTP_PORT=587')
        console.log('   - SMTP_USER=your-email@gmail.com')
        console.log('   - SMTP_PASS=your-app-password')
        console.log('================================\n')
      }
      
      throw new Error('Failed to send verification email')
    }
  }

  static async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    // In development, if email is not configured, just log the reset URL
    if (!isEmailConfigured()) {
      const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}`
      console.log('\n=== PASSWORD RESET ===')
      console.log(`Email would be sent to: ${email}`)
      console.log(`Reset URL: ${resetUrl}`)
      console.log('=====================\n')
      
      // In development, we'll consider this "successful" even without sending
      if (process.env.NODE_ENV === 'development') {
        return
      }
      
      throw new Error('Email configuration is missing. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.')
    }

    const transporter = createTransporter()
    if (!transporter) {
      throw new Error('Failed to create email transporter')
    }

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}`
    
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@stocksim.com',
      to: email,
      subject: 'Reset your StockSim password',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1f2937; margin: 0;">StockSim</h1>
            <p style="color: #6b7280; margin: 5px 0;">Virtual Stock Market Game</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">Reset Your Password</h2>
            <p style="color: #374151; line-height: 1.6;">
              We received a request to reset your password for your StockSim account. Click the button below to create a new password.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 0;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href="${resetUrl}" style="color: #3b82f6; word-break: break-all;">${resetUrl}</a>
            </p>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 12px;">
            <p>This password reset link will expire in 1 hour.</p>
            <p>If you didn't request a password reset, you can safely ignore this email.</p>
          </div>
        </div>
      `,
    }

    try {
      await transporter.sendMail(mailOptions)
      console.log(`Password reset email sent successfully to ${email}`)
    } catch (error) {
      console.error('Failed to send password reset email:', error)
      
      // In development, provide helpful error message
      if (process.env.NODE_ENV === 'development') {
        console.log('\n=== EMAIL CONFIGURATION HELP ===')
        console.log('To enable email sending in development:')
        console.log('1. Copy .env.example to .env')
        console.log('2. Configure your SMTP settings:')
        console.log('   - For Gmail: Use App Password (not regular password)')
        console.log('   - SMTP_HOST=smtp.gmail.com')
        console.log('   - SMTP_PORT=587')
        console.log('   - SMTP_USER=your-email@gmail.com')
        console.log('   - SMTP_PASS=your-app-password')
        console.log('================================\n')
      }
      
      throw new Error('Failed to send password reset email')
    }
  }
}