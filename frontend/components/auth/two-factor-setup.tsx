"use client"

import { useState } from "react"
import Image from "next/image"
import { Shield, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useToast } from "@/hooks/use-toast"

interface TwoFactorSetupProps {
  onComplete: () => void
  onCancel: () => void
}

export function TwoFactorSetup({ onComplete, onCancel }: TwoFactorSetupProps) {
  const [step, setStep] = useState<'setup' | 'verify'>('setup')
  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [secretCopied, setSecretCopied] = useState(false)
  const { toast } = useToast()

  const setup2FA = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
      })

      const result = await response.json()

      if (response.ok) {
        setQrCode(result.qrCode)
        setSecret(result.secret)
        setStep('verify')
      } else {
        toast({
          title: "Setup failed",
          description: result.error || "Failed to setup 2FA",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Setup failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const verify2FA = async () => {
    if (verificationCode.length !== 6) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: verificationCode }),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "2FA enabled!",
          description: "Two-factor authentication has been successfully enabled.",
        })
        onComplete()
      } else {
        toast({
          title: "Verification failed",
          description: result.error || "Invalid verification code",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copySecret = async () => {
    try {
      await navigator.clipboard.writeText(secret)
      setSecretCopied(true)
      setTimeout(() => setSecretCopied(false), 2000)
      toast({
        title: "Copied!",
        description: "Secret key copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy secret key",
        variant: "destructive",
      })
    }
  }

  if (step === 'setup') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Enable Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account by enabling two-factor authentication.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Step 1: Install an Authenticator App</h4>
            <p className="text-sm text-muted-foreground">
              Download and install an authenticator app like Google Authenticator, Authy, or Microsoft Authenticator on your mobile device.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Step 2: Set Up 2FA</h4>
            <p className="text-sm text-muted-foreground">
              Click the button below to generate a QR code that you'll scan with your authenticator app.
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={setup2FA} disabled={isLoading}>
              {isLoading ? "Setting up..." : "Set Up 2FA"}
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Complete 2FA Setup
        </CardTitle>
        <CardDescription>
          Scan the QR code with your authenticator app and enter the verification code.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Step 3: Scan QR Code</h4>
            <p className="text-sm text-muted-foreground">
              Open your authenticator app and scan this QR code:
            </p>
            <div className="flex justify-center p-4 bg-white rounded-lg">
              <Image
                src={qrCode}
                alt="2FA QR Code"
                width={200}
                height={200}
                className="border rounded"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Alternative: Manual Entry</h4>
            <p className="text-sm text-muted-foreground">
              If you can't scan the QR code, enter this secret key manually:
            </p>
            <div className="flex items-center gap-2">
              <Input value={secret} readOnly className="font-mono text-sm" />
              <Button
                variant="outline"
                size="sm"
                onClick={copySecret}
                className="shrink-0"
              >
                {secretCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Step 4: Enter Verification Code</Label>
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code from your authenticator app:
            </p>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={verificationCode}
                onChange={setVerificationCode}
                onComplete={verify2FA}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={verify2FA} 
              disabled={isLoading || verificationCode.length !== 6}
              className="flex-1"
            >
              {isLoading ? "Verifying..." : "Enable 2FA"}
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}