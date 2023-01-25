import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { actions } from '../featuresPosts/commentsSlice';

import * as commentsApi from '../api/comments';
import * as CommentsActions from '../featuresPosts/commentsSlice';

import { useAppDispatch, useComments, useSelectedPost } from '../app/hooks';
import { Post } from '../types/Post';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const post = useSelectedPost<Post>();
  const {
    comments, loaded, hasError, visible,
  } = useComments();

  useEffect(() => {
    dispatch(CommentsActions.init(post?.id));
  }, [post.id]);

  const deleteComment = async (commentId: number) => {
    dispatch(actions.deleteComment(commentId));

    await commentsApi.deleteComment(commentId);
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
        {!loaded && (
          <Loader />
        )}

        {loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && comments.length > 0 && (
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
                    onClick={() => deleteComment(comment.id)}
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

        {loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(
              actions.setVisible(),
            )}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && visible && (
          // <NewCommentForm onSubmit={addComment} />
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
