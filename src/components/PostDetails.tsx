/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadPostComments, removeComment } from '../features/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.comments);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    dispatch(loadPostComments(selectedPost!.id));
  }, [dispatch, selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {comments.isCommetsLoading && <Loader />}

        {!comments.isCommetsLoading &&
          comments.errorMessageOnCommentsLoading.length > 0 && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

        {!comments.isCommetsLoading &&
          comments.errorMessageOnCommentsLoading.length === 0 &&
          comments.comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

        {!comments.isCommetsLoading &&
          comments.errorMessageOnCommentsLoading.length === 0 &&
          comments.comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.comments.map(comment => (
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
                      onClick={() => dispatch(removeComment(comment.id))}
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

        {!comments.isCommetsLoading &&
          comments.errorMessageOnCommentsLoading.length === 0 &&
          !visible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setVisible(true)}
            >
              Write a comment
            </button>
          )}

        {!comments.isCommetsLoading &&
          comments.errorMessageOnCommentsLoading.length === 0 &&
          visible && <NewCommentForm />}
      </div>
    </div>
  );
};
