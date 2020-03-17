import React, { FC } from 'react';
import { connect } from 'react-redux';
import { PreparedPost } from '../../types';
import { deletePost } from '../../redux/actionCreators';
import { User } from '../User/User';
import { Comments } from '../Comments/Comments';
import '../../App.css';
import './Post.css';

interface Props {
  post: PreparedPost;
  removePost: (id: number) => void;
}

export const PostTemplate: FC<Props> = ({ post, removePost }) => {
  const {
    title,
    body,
    user,
    comments,
    id,
  } = post;

  return (
    <li className="post">
      <h2 className="post__title">{title}</h2>
      <p className="post__body">{body}</p>
      {user && <User user={user} />}
      {comments && <Comments comments={comments} />}
      <button
        type="button"
        className="delete_button"
        onClick={() => removePost(id)}
      >
        Delete Post
      </button>
    </li>
  );
};

export const mapDispatchToProps = {
  removePost: deletePost,
};

export const Post = connect(
  null,
  mapDispatchToProps,
)(PostTemplate);
