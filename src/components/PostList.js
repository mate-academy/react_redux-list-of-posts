import React from 'react';
import PostHandler from './PostHandler';
import './PostList.css';

function PostList(props) {
  const { postMap, loadPosts, loadUsers, loadComments, isLoading, isLoaded } = props;
  if (isLoaded)  {
    const postItems = postMap.map(post => <PostHandler {...post} key={post.id}/>);
    return (
      <div>{postItems}</div>
    );
  }
  return (
    <button
      className='load' disabled={(isLoading) ? 'disabled' : ''}
      onClick={() => {
      loadPosts();
      loadUsers();
      loadComments();
      }}>{(isLoading) ? 'Loading' : 'Load'}
    </button>
  );
}

export default PostList;
