import React from 'react';
import { connect } from 'react-redux';

import './comment.css';
import { deleteComment } from './store';

class Comment extends React.Component {

  handleCommentDelete = (postId, commentId) => {
    this.props.deleteComment(postId, commentId)
  };

  render() {
    const { commentData } = this.props;
    return(
      <div>
      <div className="comment" key={commentData.id}>
        <p className="comment_name">{commentData.id}</p>
        <p className="comment_name">{commentData.name}</p>
        <p className="comment_body">{commentData.body}</p>
        <p className="comment_email">{commentData.email}</p>
        <button  onClick={() =>  this.handleCommentDelete(commentData.postId, commentData.id)} >delete</button>
      </div>
  </div>
    )
  }
};

const getData = (state) => ({ });
const getMethod = (dispatch) => ({
  deleteComment: (postId, commentId) => dispatch(deleteComment(postId, commentId)),
});

export default connect(getData, getMethod)(Comment);
