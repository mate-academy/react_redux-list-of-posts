import React from 'react';
import Buttons from './Buttons';
import PostList from './PostsList';

function Main({ dataRequested, postsList, request }) {
  if (postsList) {
    return (
      <PostList postsList={postsList} />
    )
  } else {
    return (
      <Buttons isRequested={dataRequested} onClickHandler={request} />
    )
  }
}

export default Main;