import React from 'react';
import Post from './Post';

function PostsList({ postsList }) {
  return (
    <div>{postsList.map(post => <Post post={post} key={post.id} />)}</div>
  )
}

export default PostsList;
