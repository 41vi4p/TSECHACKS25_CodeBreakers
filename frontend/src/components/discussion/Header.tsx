import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  return (
    <header className="bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-blue-400">BlockchainTalk</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-blue-400">
              Home
            </a>
            <a href="#" className="text-gray-300 hover:text-blue-400">
              Popular
            </a>
            <a href="#" className="text-gray-300 hover:text-blue-400">
              All
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input type="search" placeholder="Search" className="pl-10 w-64 bg-gray-700 text-white border-gray-600" />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-gray-400" />
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}

