import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsApi from '../api/comments';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  hideCommentForm,
  showCommentForm,
} from '../features/newCommentForm/newCommentSlice';
import {
  addCommnet,
  deleteComments,
  setError,
  uploadComments,
} from '../features/comments/commentSlice';
import { CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { comments, error, loading } = useAppSelector(state => state.comments);
  const { form } = useAppSelector(state => state.newCommentForm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hideCommentForm());
    dispatch(uploadComments(post.id));
  }, [post.id, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(addCommnet(newComment));
    } catch (someError) {
      dispatch(setError());
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(deleteComments(commentId));

    await commentsApi.deleteComment(commentId);
  };

  const commentsIsVisible = !loading && !error && !!comments.length;
  const commentFormIsActive = !loading && !error && form;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {!loading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!commentsIsVisible && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {commentsIsVisible && (
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

        {!commentFormIsActive && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(showCommentForm())}
          >
            Write a comment
          </button>
        )}

        {commentFormIsActive && <NewCommentForm onSubmit={addComment} />}
      </div>
    </div>
  );
};
