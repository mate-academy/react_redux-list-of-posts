import React from 'react';
import PostHandler from './PostHandler';

function PostList(props) {
  if (!props.requested) {
    return (
      <div className="initial-button-container">
        <button  title="click to load posts" className="initial-button" type="button" onClick={props.buttonClick}>Load</button>
      </div>
    );
  }
  if (props.data === null) {
    return (
      <div className="preloader">
        <div className="preloader-title">Loading...</div>
        <div className="lds-dual-ring"></div>
      </div>
    );
  }
  return (
    <>
    <input type="text" placeholder="Search" onChange={(event) => props.getInputValue(event)}/>
    <div className="posts">
      {
        props.search ?
        props.data.filter((post) => {return post.title.includes(props.inputValue) ||
        post.body.includes(props.inputValue)}).map(item => <PostHandler post={item} key={item.id}/>) :
        props.data.map(item => <PostHandler post={item} key={item.id}/>)
      }
    </div>
    </>
  )

}

export default PostList;
