import React, { FC } from 'react';
import { connect } from 'react-redux';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';
import { FullPostType } from '../../utils/interfaces';
import './Post.css';
import { removePost as deletePost } from '../../store/actionCreators';

interface Props {
  post: FullPostType;
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
    <>
      <button type="button" onClick={() => removePost(id)}>X</button>
      <h2 className="post__title">{title}</h2>
      <p className="post__text">{body}</p>
      <User user={user} />
      <h2 className="post__comments">Comments</h2>
      <CommentList comments={comments} />
    </>
  );
};


const mapDispatchToProps = {
  removePost: deletePost,
};

export const Post = connect(null, mapDispatchToProps)(PostTemplate);
