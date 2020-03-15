import React, { FC } from 'react';
import { connect } from 'react-redux';
import { removePost as removePostStore } from '../../store';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';
import './Post.css';

interface Props {
  post: PostWithComments;
}

interface DispatchProps {
  removePost: (value: number) => void;
}

const PostTemplate: FC<Props & DispatchProps> = ({ post, removePost }) => {
  return (
    <div className="post">
      <button
        type="button"
        className="destroy destroy-post"
        aria-label="Delete"
        data-name={post.id}
        onClick={() => removePost(post.id)}
      />
      <User person={post.user} />
      <h2 className="post__heading">{post.title}</h2>
      <p className="post__text">{post.body}</p>
      <CommentList comments={post.comments} />
    </div>
  );
};

const mapDispatchToProps = {
  removePost: removePostStore,
};

export const Post = connect<{}, DispatchProps, Props, State>(
  null, mapDispatchToProps,
)(PostTemplate);
