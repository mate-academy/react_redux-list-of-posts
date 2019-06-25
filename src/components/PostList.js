import React from 'react';
import PostHandler from './PostHandler';
import './PostList.css';

function PostList(props) {
  const { requested, posts } = props;
  if (posts) {
    const postItems = posts.map(post => <PostHandler {...post} key={post.id}/>);
    return (
      <div>{postItems}</div>
    );
  }
  return (<button className='load' disabled={(requested) ? 'disabled' : ''} onClick={() => props.buttonLoadClicked()}>{(requested) ? 'Loading' : 'Load'}</button>);
}

export default PostList;
