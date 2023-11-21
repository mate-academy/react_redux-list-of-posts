import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  fetchComments,
  removeComment,
} from '../features/commentsSlice';
import { Post } from '../types/Post';

export const PostDetails: React.FC = () => {
  const { id, title, body }
    = useAppSelector(state => state.selectedPost.selectedPost as Post);
  const dispatch = useAppDispatch();
  const { items, loaded, hasError } = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);

  function loadComments() {
    if (id) {
      dispatch(fetchComments(id));
    }

    setVisible(false);
  }

  useEffect(loadComments, [id]);

  const handleAddComment = async ({ name, email, commentBody }
  : CommentData) => {
    if (id) {
      const newComment = await commentsApi.createComment({
        name,
        email,
        commentBody,
        postId: id,
      });

      dispatch(addComment(newComment));
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    dispatch(removeComment(commentId));
    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${id}: ${title}`}
        </h2>

        <p data-cy="PostBody">
          {body}
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

        {loaded && !hasError && items.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && items.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {items.map(({
              commentId, email, name, commentBody,
            }) => (
              <article
                className="message is-small"
                key={commentId}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${email}`} data-cy="CommentAuthor">
                    {name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {commentBody}
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
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
