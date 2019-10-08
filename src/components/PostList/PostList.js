import React from 'react';
import PostHandle from '../Post/PostHandle';

function PostList({ postsSorted }) {
  return (
    postsSorted.map(post => (
      <PostHandle post={post} key={post.id} />
    ))
  );
}

export default PostList;
