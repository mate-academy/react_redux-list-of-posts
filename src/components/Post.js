import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import User from './User';
import CommentList from './CommentList';

const Post = ({ post, deleteComment, deletePost }) => {
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
        deleteComment={deleteComment}
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

Post.propTypes = {
  deletePost: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  post: PropTypes.shape({
    comments: PropTypes.string,
    body: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
    user: PropTypes.object,
  }).isRequired,
};

export default Post;
