import React from 'react'
import Header from './discussion/Header'    
import PostList from './discussion/PostList'
import Sidebar from './discussion/Sidebar'

function discussion() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <PostList />
          <Sidebar />
        </div>
      </main>
    </div>
  )
}

export default discussion