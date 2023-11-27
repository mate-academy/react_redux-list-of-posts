import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  gettingComments, removeComment,
}
  from '../features/slices/commentsSlice';
import { deleteComment } from '../api/comments';
import { NewCommentForm } from './NewCommentForm';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);
  const post = useAppSelector(state => state.posts.selectedPost);

  useEffect(() => {
    setVisible(false);
    if (post) {
      dispatch(gettingComments(post.id));
    }
  }, [post]);

  const addComments = async ({ name, email, body }: CommentData) => {
    const data = {
      name,
      email,
      body,
      postId: post?.id as number,
    };

    dispatch(await addComment(data));
  };

  const deleteCommentFun = async (commentId: number) => {
    dispatch(removeComment(commentId));

    await deleteComment(commentId);
  };

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
                    onClick={() => deleteCommentFun(comment.id)}
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
          <NewCommentForm onSubmit={addComments} />
        )}
      </div>
    </div>
  );
};
