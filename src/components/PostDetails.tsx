import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteComment } from '../api/comments';
import * as commentsActions from '../features/comments/commnets';
import { Loader } from './Loader';
import { Comment } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isAddCommnet, setIsAddCommnet] = useState(false);

  const dispatch = useAppDispatch();
  const { comments, loading, error } = useAppSelector(state => state.comments);

  const getCommnetsData = (postId: number) => {
    dispatch(commentsActions.init(postId));
  };

  useEffect(() => {
    getCommnetsData(post.id);
  }, [post.id]);

  const onCommnetsDeleteHandle = async (comment: Comment) => {
    await deleteComment(comment.id);
    dispatch(commentsActions.take(comment));
    getCommnetsData(post.id);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post.id}: ${post.title}`}
        </h2>

        <p data-cy="PostBody">
          {post.body}
        </p>
      </div>

      <div className="block">
        {loading && (
          <Loader />
        )}

        {!loading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !error && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                className="message is-small"
                key={comment.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => onCommnetsDeleteHandle(comment)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!loading && !error && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsAddCommnet(true)}
          >
            Write a comment
          </button>
        )}

        {!loading && !error && isAddCommnet && (
          <NewCommentForm loadComments={getCommnetsData} />
        )}
      </div>
    </div>
  );
};
