import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { handleDeleteComment, init } from '../features/comments/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);

  const comments = useAppSelector(state => state.comments.comments);
  const loaded = useAppSelector(state => state.comments.loaded);
  const hasError = useAppSelector(state => state.comments.hasError);

  const dispatch = useAppDispatch();

  function loadComments() {
    setVisible(false);
    dispatch(init(post.id));
  }

  useEffect(loadComments, [dispatch, post.id]);

  // const addComment = async ({ name, email, body }: CommentData) => {
  //   try {
  //     const newComment = await commentsApi.createComment({
  //       name,
  //       email,
  //       body,
  //       postId: post.id,
  //     });

  //     setComments(currentComments => [...currentComments, newComment]);

  //     // setComments([...comments, newComment]);
  //     // works wrong if we wrap `addComment` with `useCallback`
  //     // because it takes the `comments` cached during the first render
  //     // not the actual ones
  //   } catch (error) {
  //     // we show an error message in case of any error
  //     setError(true);
  //   }
  // };

  // const deleteComment = async (commentId: number) => {
  //   // we delete the comment immediately so as
  //   // not to make the user wait long for the actual deletion
  //   // eslint-disable-next-line max-len
  //   setComments(currentComments =>
  //     currentComments.filter(comment => comment.id !== commentId),
  //   );

  //   await commentsApi.deleteComment(commentId);
  // };

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
                    // onClick={() => deleteComment(comment.id)}
                    onClick={() => dispatch(handleDeleteComment(comment.id))}
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
          // <NewCommentForm onSubmit={addComment} />
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
