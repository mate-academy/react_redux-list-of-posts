import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsActions from '../features/comments';

// import * as commentsApi from '../api/comments';

// import { Post } from '../types/Post';
// import { Comment, CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const PostDetails: React.FC = () => {
  const { comments, isLoading, error } = useAppSelector(
    state => state.comments,
  );
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedPost) {
      dispatch(commentsActions.loadComments(selectedPost.id));
      setVisible(false);
    }
  }, [selectedPost, dispatch]);

  // const [comments, setComments] = useState<Comment[]>([]);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);
  // const [visible, setVisible] = useState(false);

  // function loadComments() {
  //   setLoaded(false);
  //   setError(false);
  //   setVisible(false);

  //   commentsApi
  //     .getPostComments(post.id)
  //     .then(setComments) // save the loaded comments
  //     .catch(() => setError(true)) // show an error when something went wrong
  //     .finally(() => setLoaded(true)); // hide the spinner
  // }

  // useEffect(loadComments, [post.id]);

  // // The same useEffect with async/await
  // /*
  // async function loadComments() {
  //   setLoaded(false);
  //   setVisible(false);
  //   setError(false);

  //   try {
  //     const commentsFromServer = await commentsApi.getPostComments(post.id);

  //     setComments(commentsFromServer);
  //   } catch (error) {
  //     setError(true);
  //   } finally {
  //     setLoaded(true);
  //   }
  // };

  // useEffect(() => {
  //   loadComments();
  // }, []);

  // useEffect(loadComments, [post.id]); // Wrong!
  // // effect can return only a function but not a Promise
  // */

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
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {!isLoading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !error && comments.length > 0 && (
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
                    onClick={() =>
                      dispatch(commentsActions.removeComment(comment.id))
                    }
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

        {!isLoading && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !error && visible && <NewCommentForm />}
      </div>
    </div>
  );
};
