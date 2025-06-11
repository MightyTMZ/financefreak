import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { authenticator } from 'otplib'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
const JWT_EXPIRES_IN = '7d'

export interface User {
  id: string
  email: string
  username: string
  isEmailVerified: boolean
  twoFactorEnabled: boolean
  twoFactorSecret?: string
  createdAt: Date
  portfolioValue: number
  availableCash: number
}

export interface AuthToken {
  userId: string
  email: string
  username: string
  iat: number
  exp: number
}

// In a real application, this would be stored in a database
// For demo purposes, we'll use in-memory storage
const users: Map<string, User> = new Map()
const emailVerificationTokens: Map<string, { userId: string; expires: Date }> = new Map()
const passwordResetTokens: Map<string, { userId: string; expires: Date }> = new Map()

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  static generateToken(user: User): string {
    const payload = {
      userId: user.id,
      email: user.email,
      username: user.username
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
  }

  static verifyToken(token: string): AuthToken | null {
    try {
      return jwt.verify(token, JWT_SECRET) as AuthToken
    } catch {
      return null
    }
  }

  static generateEmailVerificationToken(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  static generate2FASecret(): string {
    return authenticator.generateSecret()
  }

  static generate2FAQRCode(email: string, secret: string): string {
    return authenticator.keyuri(email, 'StockSim', secret)
  }

  static verify2FAToken(token: string, secret: string): boolean {
    return authenticator.verify({ token, secret })
  }

  static async createUser(email: string, username: string, password: string): Promise<{ user: User; verificationToken: string }> {
    const userId = Math.random().toString(36).substring(2, 15)
    const hashedPassword = await this.hashPassword(password)
    
    const user: User = {
      id: userId,
      email,
      username,
      isEmailVerified: false,
      twoFactorEnabled: false,
      createdAt: new Date(),
      portfolioValue: 100000, // Starting with $100,000 virtual money
      availableCash: 100000
    }

    // Store user with hashed password (in real app, this would be in database)
    users.set(userId, { ...user, password: hashedPassword } as any)

    // Generate email verification token
    const verificationToken = this.generateEmailVerificationToken()
    emailVerificationTokens.set(verificationToken, {
      userId,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    })

    return { user, verificationToken }
  }

  static async getUserByEmail(email: string): Promise<(User & { password: string }) | null> {
    for (const user of users.values()) {
      if ((user as any).email === email) {
        return user as User & { password: string }
      }
    }
    return null
  }

  static async getUserById(id: string): Promise<User | null> {
    const user = users.get(id)
    if (user) {
      const { password, ...userWithoutPassword } = user as any
      return userWithoutPassword
    }
    return null
  }

  static async verifyEmail(token: string): Promise<boolean> {
    const tokenData = emailVerificationTokens.get(token)
    if (!tokenData || tokenData.expires < new Date()) {
      emailVerificationTokens.delete(token)
      return false
    }

    const user = users.get(tokenData.userId)
    if (user) {
      (user as any).isEmailVerified = true
      users.set(tokenData.userId, user)
      emailVerificationTokens.delete(token)
      return true
    }

    return false
  }

  static async enable2FA(userId: string): Promise<{ secret: string; qrCode: string } | null> {
    const user = users.get(userId)
    if (!user) return null

    const secret = this.generate2FASecret()
    const qrCode = this.generate2FAQRCode((user as any).email, secret)

    // Store the secret temporarily (user needs to verify it first)
    (user as any).tempTwoFactorSecret = secret
    users.set(userId, user)

    return { secret, qrCode }
  }

  static async verify2FASetup(userId: string, token: string): Promise<boolean> {
    const user = users.get(userId)
    if (!user || !(user as any).tempTwoFactorSecret) return false

    const isValid = this.verify2FAToken(token, (user as any).tempTwoFactorSecret)
    if (isValid) {
      (user as any).twoFactorSecret = (user as any).tempTwoFactorSecret
      (user as any).twoFactorEnabled = true
      delete (user as any).tempTwoFactorSecret
      users.set(userId, user)
      return true
    }

    return false
  }

  static async disable2FA(userId: string, token: string): Promise<boolean> {
    const user = users.get(userId)
    if (!user || !(user as any).twoFactorSecret) return false

    const isValid = this.verify2FAToken(token, (user as any).twoFactorSecret)
    if (isValid) {
      (user as any).twoFactorEnabled = false
      delete (user as any).twoFactorSecret
      users.set(userId, user)
      return true
    }

    return false
  }
}