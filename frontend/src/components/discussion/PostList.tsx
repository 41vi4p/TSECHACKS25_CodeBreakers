import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Adjust the import path as necessary
import Post from './Post';

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  upvotes: number;
  comments: number;
  timeAgo: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postsData = querySnapshot.docs.map((doc) => doc.data() as Post);
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full md:w-2/3 space-y-6">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostList;