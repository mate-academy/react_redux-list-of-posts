import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import User from './User';
import CommentList from './CommentList';
import { postDelete } from './redux/actions';

const Posts = ({ post, deletePost }) => {
  const postDeletor = (e, postId) => {
    e.preventDefault();
    deletePost(postId);
  };

  return (
    <tr>
      <td>{post.title}</td>
      <td>{post.body}</td>
      <User user={post.user} />
      <CommentList
        comments={post.comments}
      />
      <td>
        <Button icon>
          <Icon
            name="user delete"
            onClick={e => postDeletor(e, post.id)}
          />
        </Button>
      </td>
    </tr>
  );
};

const mapDispatch2Props = dispatch => ({
  deletePost: postId => dispatch(postDelete(postId)),
});

const Post = connect(
  null,
  mapDispatch2Props,
)(Posts);

Posts.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.shape({
    comments: PropTypes.string,
    body: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
    user: PropTypes.object,
  }).isRequired,
};

export default Post;
