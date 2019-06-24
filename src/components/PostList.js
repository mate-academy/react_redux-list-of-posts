import React from 'react';
import PostHandler from './PostHandler';
import './PostList.css';

function PostList(props) {
  if (!props.requested) {
    return (
      <div className="container">
        <div className="load" onClick={props.load} />
      </div>
    );
  }
  if (props.articles === null) {
    return <span className="loading">Loading...</span>;
  }
  return props.articles.map(item => <PostHandler article={item} key={item.id}/>);
}

export default PostList;
