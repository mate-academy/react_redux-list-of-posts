import React from 'react';
import { useSelector } from 'react-redux';

import { CommentList } from '../Comments';
import { getUsers } from '../../store';

interface Props {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const PostItem: React.FC<Props> = ({
  id,
  title,
  body,
  userId,
}) => {
  const users: User[] = useSelector(getUsers);
  const author = users.find(user => user.id === userId);

  return (
    <article className="message is-primary" id={`${id}`}>
      <div className="message-header">
        <h1 className="title has-text-white is-capitalized is-4">
          {title}
        </h1>
      </div>
      <div className="message-body">
        {author && (
          <h2 className="subtitle">
            {`Author: ${author.username}`}
          </h2>
        )}
        {body}
        <CommentList postId={id} />
      </div>
    </article>
  );
};
