"use client"

import { useState } from "react"
import { User, ChevronRight, Settings, ClipboardList, HelpCircle, ArrowUpRight, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const [username, setUsername] = useState("yourusername")
  const [email, setEmail] = useState("your.email@example.com")
  const [notifications, setNotifications] = useState({
    portfolio: true,
    price: true,
    news: false,
    transactions: true,
    promotions: false
  })
  
  return (
    <div className="container max-w-6xl py-8 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-16 w-16">
                <AvatarFallback>YS</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Your Account</CardTitle>
                <CardDescription className="mt-1">@{username}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="mt-2 space-y-2">
                <div className="text-sm text-muted-foreground flex justify-between">
                  <span>Member since</span>
                  <span>May 1, 2025</span>
                </div>
                <div className="text-sm text-muted-foreground flex justify-between">
                  <span>Portfolio Value</span>
                  <span className="font-medium text-foreground">$11,824.75</span>
                </div>
                <div className="text-sm text-muted-foreground flex justify-between">
                  <span>Available Cash</span>
                  <span className="font-medium text-foreground">$4,320.67</span>
                </div>
                <div className="text-sm text-muted-foreground flex justify-between">
                  <span>Total Return</span>
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +18.25%
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Account Menu</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <nav className="space-y-1">
                {[
                  { label: "Account Settings", icon: <Settings className="h-4 w-4" /> },
                  { label: "Transaction History", icon: <ClipboardList className="h-4 w-4" /> },
                  { label: "Help & Support", icon: <HelpCircle className="h-4 w-4" /> },
                  { label: "Log Out", icon: <LogOut className="h-4 w-4" /> }
                ].map((item, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="w-full justify-start h-auto py-2"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </Button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <Tabs defaultValue="settings">
            <TabsList className="w-full border-b rounded-none justify-start h-auto p-0">
              <TabsTrigger 
                value="settings" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10"
              >
                Account Settings
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10"
              >
                Security
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="preferences" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10"
              >
                Preferences
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="settings" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback>YS</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Change Picture</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Trading Settings</CardTitle>
                  <CardDescription>
                    Configure your trading preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-cash">Default Cash Amount for New Game</Label>
                    <Input 
                      id="default-cash" 
                      type="number" 
                      defaultValue="100000" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="confirm-trades">Trade Confirmations</Label>
                      <p className="text-sm text-muted-foreground">
                        Ask for confirmation before executing trades
                      </p>
                    </div>
                    <Switch id="confirm-trades" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="price-alerts">Price Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable price movement notifications
                      </p>
                    </div>
                    <Switch id="price-alerts" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Portfolio Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive daily summaries of your portfolio performance
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.portfolio} 
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, portfolio: checked})
                      } 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Price Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications for significant price movements
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.price} 
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, price: checked})
                      } 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Market News</Label>
                      <p className="text-sm text-muted-foreground">
                        Breaking news about companies in your portfolio
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.news} 
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, news: checked})
                      } 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Transaction Confirmations</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications for completed transactions
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.transactions} 
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, transactions: checked})
                      } 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Promotions & Tips</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive trading tips and promotional information
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.promotions} 
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, promotions: checked})
                      } 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Display Preferences</CardTitle>
                  <CardDescription>
                    Customize your trading experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Percentage Changes</Label>
                      <p className="text-sm text-muted-foreground">
                        Display percentage changes in addition to absolute values
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Compact View</Label>
                      <p className="text-sm text-muted-foreground">
                        Use a more compact UI for displaying stocks
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Real-time Data Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically update stock data in real-time
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Default Chart Timeframe</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {["1D", "1W", "1M", "1Y", "YTD", "All"].map((period) => (
                        <Button key={period} variant="outline" size="sm">
                          {period}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}