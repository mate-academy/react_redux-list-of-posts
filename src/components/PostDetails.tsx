import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCurrentPost,
} from '../features/posts/postsSLice';
import {
  deleteCommentByCommentId,
  selectComments,
  selectCommentsStatus,
  getCommentsByPostId,
  resetComments,
} from '../features/comments/commentsSlice';

type Props = {
};

export const PostDetails: React.FC<Props> = () => {
  const [visible, setVisible] = useState(false);

  const post = useAppSelector(selectCurrentPost);
  const comments = useAppSelector(selectComments);
  const statusCommentsDownload = useAppSelector(selectCommentsStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (post?.id) {
      dispatch(resetComments());
      dispatch(getCommentsByPostId(post.id));
    }
  }, [post?.id]);

  return post && (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post?.id}: ${post?.title}`}
        </h2>

        <p data-cy="PostBody">
          {post?.body}
        </p>
      </div>

      <div className="block">
        {statusCommentsDownload === 'loading' && (
          <Loader />
        )}

        {statusCommentsDownload === 'failed' && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        { statusCommentsDownload === 'idle'
          && comments.length === 0
          && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

        <div
          style={{
            boxSizing: 'border-box',
          }}
        >
          { statusCommentsDownload === 'idle'
            && comments.length > 0
            && (
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
                        onClick={() => {
                          dispatch(deleteCommentByCommentId(comment.id));
                        }}
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
        </div>

        { statusCommentsDownload === 'idle'
          && !visible
          && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setVisible(true)}
            >
              Write a comment
            </button>
          )}

        { statusCommentsDownload === 'idle'
          && visible
          && (
            <NewCommentForm />
          )}
      </div>
    </div>
  );
};
