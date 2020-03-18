import React, { FC } from 'react';
import { connect } from 'react-redux';
import { CommentList } from './CommentList';
import { User } from './User';
import { setDeletePost } from '../redux/actions';

interface Props {
  post: PreparedPostInterface;
  deletePost: (id: number) => void;
}

const PostTemplate: FC<Props> = ({ post, deletePost }) => {
  const {
    title,
    body,
    comments,
    user,
    id,
  } = post;

  return (
    <>
      <button type="button" onClick={() => deletePost(id)}>X</button>
      <h2>{title}</h2>
      <p>{body}</p>
      {user && <User user={user} />}
      <p>Comments</p>
      <ul className="comments list">
        <CommentList comments={comments} />
      </ul>
    </>
  );
};

const mapDispatchToProps = {
  deletePost: setDeletePost,
};

export const Post = connect(
  null,
  mapDispatchToProps,
)(PostTemplate);
