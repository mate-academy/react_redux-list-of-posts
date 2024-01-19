import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

// import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  actions as commentActions,
  deleteComment as removeCommentFromAPI,
} from '../features/comments/commentsSlice';
import { loadingStatus } from '../features/posts/postsSlice';

/* type Props = {
  post: Post;
}; */

export const PostDetails: React.FC = () => {
  const post = useAppSelector(state => state.selectedPost.post);
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.comments.comments);
  const error = useAppSelector(state => state.comments.hasError);
  const loaded = useAppSelector(state => state
    .comments.loaded !== loadingStatus.loading);

  // const [comments, setComments] = useState<Comment[]>([]);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  /*   function loadComments() {

  } */

  useEffect(() => {
    if (post?.id) {
      // setLoaded(false);
      // setError(false);
      setVisible(false);

      commentsApi.getPostComments(post.id)
        .then(result => dispatch(commentActions.set(result))); // save the loaded comments
      // .catch(() => setError(true)) // show an error when something went wrong
      // .finally(() => setLoaded(true)); // hide the spinner
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

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
    /*     try { */
    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId: post?.id || 0,
    });

    dispatch(commentActions.add(newComment));

    /* setComments(
      currentComments => [...currentComments, newComment],
    ); */

    // setComments([...comments, newComment]);
    // works wrong if we wrap `addComment` with `useCallback`
    // because it takes the `comments` cached during the first render
    // not the actual ones
    /*     } */ /* catch (error) {
      // we show an error message in case of any error
      setError(true);
    } */
  };

  const deleteComment = (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
  /*     setComments(
      currentComments => currentComments.filter(
        comment => comment.id !== commentId,
      ),
    ); */

    dispatch(commentActions.delete(commentId));

    // await commentsApi.deleteComment(commentId);
    dispatch(removeCommentFromAPI(commentId));
  };

  return (post
    && (
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

          {loaded && error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
              {error}
            </div>
          )}

          {loaded && !error && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {loaded && !error && comments.length > 0 && (
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

          {loaded && !error && !visible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setVisible(true)}
            >
              Write a comment
            </button>
          )}

          {loaded && !error && visible && (
            <NewCommentForm onSubmit={addComment} />
          )}
        </div>
      </div>
    ));
};
