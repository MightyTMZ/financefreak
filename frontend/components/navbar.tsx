"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, Search, TrendingUp, Trophy, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="h-5 w-5 mr-2" />,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <BarChart3 className="h-5 w-5 mr-2" />,
    },
    {
      name: "Discover",
      path: "/discover",
      icon: <Search className="h-5 w-5 mr-2" />,
    },
    {
      name: "Market",
      path: "/market",
      icon: <TrendingUp className="h-5 w-5 mr-2" />,
    },
    {
      name: "Leaderboard",
      path: "/leaderboard",
      icon: <Trophy className="h-5 w-5 mr-2" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User className="h-5 w-5 mr-2" />,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
              >
                <TrendingUp className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px]">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  <TrendingUp className="h-6 w-6" />
                  <span>FinanceFreak</span>
                </Link>
                <div className="grid gap-3">
                  {routes.map((route) => (
                    <Link
                      key={route.path}
                      href={route.path}
                      className={cn(
                        "flex items-center gap-2 text-muted-foreground",
                        pathname === route.path && "text-foreground font-medium"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {route.icon}
                      {route.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight hidden md:inline-block">
              FinanceFreak
            </span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {routes.map((route) => (
                <NavigationMenuItem key={route.path}>
                  <Link href={route.path} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "flex items-center",
                        pathname === route.path && "font-medium bg-accent"
                      )}
                    >
                      {route.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button className="hidden md:flex">Sign In</Button>
        </div>
      </div>
    </header>
  )
}
