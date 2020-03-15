import React, { FC } from 'react';

import { User } from '../User';
import { CommentList } from '../CommentList';

import { FullPost } from '../../constants/types';

interface Props {
  post: FullPost;
}


export const Post: FC<Props> = (props) => {
  const { post } = props;
  const {
    title,
    body,
    user,
    comments,
  } = post;

  return (
    <>
      <p>
        <b>Title:</b>
        {' '}
        {title}
      </p>
      <p>
        <b>Body:</b>
        {' '}
        {body}
      </p>
      <User user={user} />
      <CommentList comments={comments} />
    </>
  );
};
