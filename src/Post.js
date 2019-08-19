import React from 'react';
import { connect } from 'react-redux';

import User from './User';
import CommentsList from './CommentsList';
import { deletePost } from './store';

class Post extends React.Component {

  handlePostDelete = (value) => {
    this.props.deletePost(value)
  };

  render() {
    const { postData } = this.props;
    return(
      <div>
        <div className="postlist_title">{postData.id} </div>
        <div className="postlist_title">{postData.title} </div>
        <div className="postlist_body">{postData.body} </div>
        <div><User userData={postData.userData} /></div>
        <div><CommentsList commentData={postData.userComments} /></div>
        <button
          onClick={() =>  this.handlePostDelete(postData.id)}
          className="commentlist_load-buttom"
        >
          delete
        </button>
    </div>
    )
  }
}

const getData = (state) => ({});

const getMethod = (dispatch) => ({
  deletePost: (value) => dispatch(deletePost(value)),
  });

export default connect(getData, getMethod)(Post);
