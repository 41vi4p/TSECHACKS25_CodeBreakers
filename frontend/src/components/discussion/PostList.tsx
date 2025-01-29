import Post from "./Post"

const posts = [
  {
    id: 1,
    title: "Ethereum 2.0: The Future of Scalability",
    author: "vitalik_fan",
    content: "Ethereum 2.0 promises to solve scalability issues. What are your thoughts on its potential impact?",
    upvotes: 152,
    comments: 37,
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    title: "Bitcoin vs. Central Bank Digital Currencies: The Showdown",
    author: "crypto_enthusiast",
    content: "As more countries develop CBDCs, how will this affect Bitcoin's position in the market?",
    upvotes: 98,
    comments: 24,
    timeAgo: "5 hours ago",
  },
  {
    id: 3,
    title: "DeFi: Revolutionizing Finance or Creating New Risks?",
    author: "defi_explorer",
    content:
      "DeFi protocols are growing rapidly, but so are the associated risks. How can we balance innovation with security?",
    upvotes: 75,
    comments: 19,
    timeAgo: "8 hours ago",
  },
]

export default function PostList() {
  return (
    <div className="w-full md:w-2/3 space-y-6">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  )
}

