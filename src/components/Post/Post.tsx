import React, { FC } from 'react';
import { connect } from 'react-redux';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';
import { FullPostType } from '../../utils/interfaces';
import './Post.css';
import { remover as removePost } from '../../store/actionCreators';

interface Props {
  post: FullPostType;
  remover: (id: number) => void;
}

export const PostTemplate: FC<Props> = ({ post, remover }) => {
  const {
    title,
    body,
    user,
    comments,
    id,
  } = post;

  return (
    <>
      <button type="button" onClick={() => remover(id)}>X</button>
      <h2 className="post__title">{title}</h2>
      <p className="post__text">{body}</p>
      <User user={user} />
      <h2 className="post__comments">Comments</h2>
      <CommentList comments={comments} />
    </>
  );
};


const mapDispatchToProps = {
  remover: removePost,
};

export const Post = connect(null, mapDispatchToProps)(PostTemplate);
