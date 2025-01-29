import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const trendingTopics = [
  "Ethereum 2.0",
  "DeFi Yield Farming",
  "NFT Marketplaces",
  "Layer 2 Solutions",
  "Crypto Regulations",
]

export default function Sidebar() {
  return (
    <div className="w-full md:w-1/3 space-y-6">
      <Card className="bg-gray-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white">Trending Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {trendingTopics.map((topic, index) => (
              <li key={index}>
                <a href="#" className="text-blue-400 hover:underline">
                  #{topic}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="bg-gray-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white">About Community</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-400">
            Welcome to BlockchainTalk, the premier forum for discussing the latest in blockchain technology and
            cryptocurrencies.
          </p>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
            Create Post
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

