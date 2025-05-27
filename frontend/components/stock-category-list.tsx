"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Monitor, 
  Pill, 
  DollarSign, 
  Car, 
  ShoppingBag, 
  Factory, 
  Briefcase,
  Building,
  Utensils,
  Phone,
  Lightbulb,
  Plane,
  Leaf
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const categories = [
  { 
    name: "Technology", 
    icon: <Monitor className="h-8 w-8" />,
    description: "Software, hardware, and tech services",
    path: "/market/sectors/technology"
  },
  { 
    name: "Healthcare", 
    icon: <Pill className="h-8 w-8" />,
    description: "Pharmaceuticals, biotech, and healthcare services",
    path: "/market/sectors/healthcare"
  },
  { 
    name: "Financial Services", 
    icon: <DollarSign className="h-8 w-8" />,
    description: "Banks, insurance, and financial institutions",
    path: "/market/sectors/financial"
  },
  { 
    name: "Automotive", 
    icon: <Car className="h-8 w-8" />,
    description: "Vehicle manufacturers and suppliers",
    path: "/market/sectors/automotive"
  },
  { 
    name: "Consumer Goods", 
    icon: <ShoppingBag className="h-8 w-8" />,
    description: "Clothing, personal products, and household goods",
    path: "/market/sectors/consumer"
  },
  { 
    name: "Industrials", 
    icon: <Factory className="h-8 w-8" />,
    description: "Manufacturing, machinery, and industrial services",
    path: "/market/sectors/industrials"
  },
  { 
    name: "Business Services", 
    icon: <Briefcase className="h-8 w-8" />,
    description: "Consulting, HR, and business support services",
    path: "/market/sectors/business"
  },
  { 
    name: "Real Estate", 
    icon: <Building className="h-8 w-8" />,
    description: "REITs, property management, and construction",
    path: "/market/sectors/realestate"
  },
  { 
    name: "Food & Beverage", 
    icon: <Utensils className="h-8 w-8" />,
    description: "Restaurants, food production, and beverages",
    path: "/market/sectors/food"
  },
  { 
    name: "Telecommunications", 
    icon: <Phone className="h-8 w-8" />,
    description: "Wireless carriers, internet providers, and telecom equipment",
    path: "/market/sectors/telecom"
  },
  { 
    name: "Utilities", 
    icon: <Lightbulb className="h-8 w-8" />,
    description: "Electric, gas, and water utilities",
    path: "/market/sectors/utilities"
  },
  { 
    name: "Transportation", 
    icon: <Plane className="h-8 w-8" />,
    description: "Airlines, shipping, and logistics",
    path: "/market/sectors/transportation"
  },
  { 
    name: "Energy", 
    icon: <Leaf className="h-8 w-8" />,
    description: "Oil & gas, renewable energy, and energy equipment",
    path: "/market/sectors/energy"
  }
]

export default function StockCategoryList() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 bg-background border rounded-md px-3 py-2 w-full max-w-sm">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input 
          className="border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0" 
          placeholder="Search categories..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category, index) => (
          <Link href={category.path} key={index}>
            <Card className="p-4 h-full hover:bg-secondary/50 transition-colors cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-medium text-lg">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
        {filteredCategories.length === 0 && (
          <div className="col-span-3 text-center py-12">
            <h3 className="text-lg font-medium">No categories found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </div>
  )
}