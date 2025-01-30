import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { useState } from "react"

interface PostProps {
  title: string
  author: string
  content: string
  upvotes: number
  comments: number
  timeAgo: string
}

export default function Post({ title, author, content, upvotes, comments, timeAgo }: PostProps) {
  const [votes, setVotes] = useState(upvotes);

  const handleUpvote = () => {
    setVotes(votes + 1);
  };

  const handleDownvote = () => {
    setVotes(votes - 1);
  };

  return (
    <Card className="bg-gray-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <p className="text-sm text-gray-400">
          Posted by u/{author} {timeAgo}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300">{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleUpvote}>
            <ArrowBigUp className="h-5 w-5 mr-1 text-gray-400" />
          </Button>
          <span className="text-gray-400">{votes}</span>
          <Button variant="ghost" size="sm" onClick={handleDownvote}>
            <ArrowBigDown className="h-5 w-5 mr-1 text-gray-400" />
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <MessageSquare className="h-5 w-5 mr-1 text-gray-400" />
          <span className="text-gray-400">{comments} Comments</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="h-5 w-5 mr-1 text-gray-400" />
          <span className="text-gray-400">Share</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

