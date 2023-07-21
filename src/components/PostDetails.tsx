import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Comment } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteAsync as deleteComment, incrementAsync as loadingComments }
  from '../features/comments/commemtsSlice';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const {
    value: post,
  } = useAppSelector(state => state.selectedPost);
  const comments: Comment[] = useAppSelector(state => state.comments.value);
  const commentsStatus = useAppSelector(state => state.comments.status);
  const dispatch = useAppDispatch();
  const [
    visibleComments, setVisibleComments,
  ] = useState<Comment[]>([]);

  useEffect(() => {
    if (post) {
      dispatch(loadingComments(post.id));
      setVisible(false);
    }
  }, [post?.id]);

  useEffect(() => {
    setVisibleComments([]);
  }, [commentsStatus === 'loading']);

  useEffect(() => {
    setVisibleComments(comments);
  }, [commentsStatus === 'idle']);

  return (
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
        {commentsStatus === 'loading' && (
          <Loader />
        )}

        {commentsStatus === 'failed' && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {commentsStatus === 'idle'
          && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {visibleComments.length > 0 && commentsStatus === 'idle' && (
          <>
            <p className="title is-4">Comments:</p>
            {visibleComments.map((comment) => (
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
                      setVisibleComments(
                        prev => prev.filter(c => c.id !== comment.id),
                      );
                      dispatch(deleteComment(comment.id));
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

        {visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
