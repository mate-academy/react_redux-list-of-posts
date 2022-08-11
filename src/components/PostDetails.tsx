import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addComment, addCommentLocal, deleteComment, deleteCommentLocal,
  loadComments,
  setVisibleComments,
} from '../store/reducers/commentsSlice';

export const PostDetails: React.FC = () => {
  const {
    comments,
    loaded,
    hasError,
    visibleComments,
  } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.posts);
  // function loadComments() {
  //   setLoaded(false);
  //   setError(false);
  //   setVisible(false);
  //
  //   commentsApi.getPostComments(post.id)
  //     .then(setComments) // save the loaded comments
  //     .catch(() => setError(true)) // show an error when something went wrong
  //     .finally(() => setLoaded(true)); // hide the spinner
  // }

  useEffect(() => {
    if (selectedPost) {
      dispatch(loadComments(selectedPost.id));
    }
  }, [selectedPost?.id]);

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

  const onAddComment = async ({ name, email, body }: CommentData) => {
    const newComment = {
      name,
      email,
      body,
      postId: selectedPost?.id || 0,
    };

    dispatch(addComment(newComment));
    dispatch(addCommentLocal(newComment));
  };

  const onDeleteComment = async (commentId: number) => {
    dispatch(deleteComment(commentId));
    dispatch(deleteCommentLocal(commentId));
  };

  return (
    <div className="content">
      <div className="block">
        <h2>
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>
        <p>{selectedPost?.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {loaded && hasError && (
          <div className="notification is-danger">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p className="title is-4">No comments yet</p>
        )}

        {loaded && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article className="message is-small" key={comment.id}>
                <div className="message-header">
                  <a href={`mailto:${comment.email}`}>
                    {comment.name}
                  </a>

                  <button
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => onDeleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {loaded && !hasError && !visibleComments && (
          <button
            type="button"
            className="button is-link"
            onClick={() => dispatch(setVisibleComments())}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && visibleComments && (
          <NewCommentForm onSubmit={onAddComment} />
        )}
      </div>
    </div>
  );
};
