import React, { FC } from 'react';

import { Comment as CommentInterface } from '../../constants/types';

interface Props {
  comment: CommentInterface;
}


export const Comment: FC<Props> = (props) => {
  const { comment } = props;

  return (
    <>
      {comment.body}
    </>
  );
};
