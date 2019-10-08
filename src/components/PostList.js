import React from 'react';
import PostHandler from './PostHandler';
import './envelope.css';
import './PostList.css';

function PostList(props) {
  if (!props.requested) {
    return (
      <section className="circle">
        <div className="envelope" onClick={props.load} />
      </section>
    );
  }
  if (props.articles === null) {
    return <span className="loading">Loading...</span>;
  }
  return props.articles.map(item => <PostHandler article={item} key={item.id}/>);
}

export default PostList;
