/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentData } from '../types/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import {
  fetchComments,
  addComments,
  deleteComments,
} from '../features/comments/commentsThunk';

/* type Props = {
  post: Post;
}; */

export const PostDetails: React.FC = () => {
  //const [comments, setComments] = useState<Comment[]>([]);
  //const [loaded, setLoaded] = useState(false);
  //const [hasError, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const post = useSelector((state: RootState) => state.post);
  const comments = useSelector((state: RootState) => state.comments);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setVisible(false);
    dispatch(fetchComments(post.id));
  }, [post.id, dispatch]);

  // The same useEffect with async/await
  /*
  async function loadComments() {
    setLoaded(false);
    setVisible(false);
    setError(false);

    try {
      const commentsFromServer = await commentsApi.getPostComments(post.id);

      setComments(commentsFromServer);
    } catch (error) {
      setError(true);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  useEffect(loadComments, [post.id]); // Wrong!
  // effect can return only a function but not a Promise
  */

  const addComment = async ({ name, email, body }: CommentData) => {
    await dispatch(addComments({ name, email, body }, post.id));

    /* await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });
      dispatch(fetchComments(post.id)); */

    //setComments(currentComments => [...currentComments, newComment]);

    // setComments([...comments, newComment]);
    // works wrong if we wrap `addComment` with `useCallback`
    // because it takes the `comments` cached during the first render
    // not the actual ones
  };

  const deleteComment = (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    // eslint-disable-next-line max-len
    /* setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    ); */
    //await commentsApi.deleteComment(commentId);
    dispatch(deleteComments(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!comments.loaded && <Loader />}

        {comments.loaded && comments.hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {comments.loaded &&
          !comments.hasError &&
          comments.comment.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

        {comments.loaded &&
          !comments.hasError &&
          comments.comment.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.comment.map(comment => (
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

        {comments.loaded && !comments.hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {comments.loaded && !comments.hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
