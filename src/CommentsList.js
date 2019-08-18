import React from 'react';
import { connect } from 'react-redux';

import Comment from './Comment';
import './commentlist.css';

import { getCommentLists, setCommentList } from './store';

class CommentsList extends React.Component {

  handleClick = () => {
   this.props.setCommentList()
  };

  render() {
    const { commentData, commentListIsOpen } = this.props;
    return (
      <div>
        <button
          className="commentlist_load-buttom"
          type="button"
          onClick={this.handleClick}
        >
          {commentListIsOpen ? 'Hide comments' : 'Show comments'}
        </button>
        {commentListIsOpen
        && commentData.map(comment =>
        (
          <Comment
            commentData={comment}
            key={comment.id}
          />
        ))}
      </div>
    );
  };
}

const getData = state => ({
  commentListIsOpen: getCommentLists(state),

});

const getMethod = dispatch => ({
  setCommentList: () => dispatch(setCommentList()),
});

export default connect(getData, getMethod)(CommentsList);
