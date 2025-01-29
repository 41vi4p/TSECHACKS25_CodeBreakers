import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Adjust the import path as necessary
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Adjust the import path as necessary
import { Button } from '@/components/ui/button'; // Adjust the import path as necessary

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  upvotes: number;
  comments: number;
  timeAgo: string;
}

const CreatePost: React.FC<{ onCreate: (post: Post) => void }> = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !content) {
      alert('Please fill in all fields');
      return;
    }
    const newPost = {
      id: Date.now(), // Use timestamp as a unique ID
      title,
      author,
      content,
      upvotes: 0,
      comments: 0,
      timeAgo: 'Just now',
    };
    try {
      const docRef = await addDoc(collection(db, 'posts'), newPost);
      console.log('Document written with ID: ', docRef.id);
      onCreate(newPost);
      setTitle('');
      setAuthor('');
      setContent('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <Card className="bg-gray-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white">Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-2.5 text-sm sm:text-base rounded-lg outline-none transition-all bg-gray-700/50 text-white focus:bg-gray-700/70 border border-gray-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
              className="w-full p-2.5 text-sm sm:text-base rounded-lg outline-none transition-all bg-gray-700/50 text-white focus:bg-gray-700/70 border border-gray-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              className="w-full p-2.5 text-sm sm:text-base rounded-lg outline-none transition-all bg-gray-700/50 text-white focus:bg-gray-700/70 border border-gray-600 focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            Create Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePost;