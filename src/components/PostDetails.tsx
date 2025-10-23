import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchCommentsByPost,
  createComment,
  removeComment,
} from '../features/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.comments.items);
  const loaded = useAppSelector(state => state.comments.loaded);
  const hasError = useAppSelector(state => state.comments.hasError);

  useEffect(() => {
    setVisible(false);
    dispatch(fetchCommentsByPost(post.id));
    // we don't clear comments here as the fetchCommentsByPost action does it
  }, [post.id, dispatch]);

  const addComment = async (data: CommentData) => {
    try {
      await dispatch(createComment({ postId: post.id, data })).unwrap();
      // keep the name/email as the form does; new comment body cleared inside the form by the component
    } catch (err) {
      // comments slice will set hasError on rejection
    }
  };

  const deleteComment = async (commentId: number) => {
    // optimistic removal is handled by the slice after successful API call
    try {
      await dispatch(removeComment(commentId)).unwrap();
    } catch (err) {
      // handled via hasError in slice
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

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
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
