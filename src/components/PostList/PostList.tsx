import React from 'react';
import Post from '../Post/Post';

type Props = {
  posts: PreparedPost[];
};

const PostList: React.FC<Props> = ({ posts }) => (
  <div className="container">
    {posts.map((post: PreparedPost) => (
      <Post {...post} key={post.id} />
    ))}
  </div>
);

export default PostList;
