import React from 'react';
import { CommentList } from '../Comments';

interface Props {
  id: number;
  title: string;
  body: string;
  author?: User;
  comments?: Comment[];
}

export const PostItem: React.FC<Props> = ({
  id,
  title,
  body,
  author,
  comments,
}) => {

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
        {comments && <CommentList comments={comments} />}
      </div>
    </article>
  );
};
