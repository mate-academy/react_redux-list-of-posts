import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsActions from '../features/commentsSlice';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const PostDetails: React.FC = () => {
  const post = useAppSelector(state => state.selectedPost.selectedPost);
  const comments = useAppSelector(state => state.comments.comments);
  const commentsStatus = useAppSelector(state => state.comments.status);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  async function loadComments() {
    setVisible(false);

    if (post) {
      await dispatch(commentsActions.getCommentsAsync(post.id));
    }
  }

  useEffect(() => {
    loadComments();
  }, [post?.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    if (post) {
      const newComment = await dispatch(
        commentsActions.addCommentAsync({
          name,
          email,
          body,
          postId: post.id,
        }),
      );

      dispatch(
        commentsActions.changeComments([...comments, newComment.payload]),
      );
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(
      commentsActions.changeComments(
        comments.filter(comment => comment.id !== commentId),
      ),
    );

    await dispatch(commentsActions.deleteCommentAsync(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {commentsStatus === 'loading' && <Loader />}

        {commentsStatus === 'failed' && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {commentsStatus === 'idle' && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {commentsStatus === 'idle' && comments.length > 0 && (
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

        {commentsStatus === 'idle' && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {commentsStatus === 'idle' && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
