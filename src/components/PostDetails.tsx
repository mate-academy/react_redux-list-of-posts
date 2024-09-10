import React, { useState } from 'react';
import { Loader } from './Loader';

import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { NewCommentForm } from './NewCommentForm';
import { CommentData } from '../types/Comment';
import { addComments, deleteComments } from '../features/comments/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { comments, loaded, hasError } = useAppSelector(state => state.comment);
  // const [comments, setComments] = useState<Comment[]>([]);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

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
    if (post) {
      await dispatch(
        addComments({
          name,
          email,
          body,
          postId: post.id,
        }),
      );
    }
  };

  const deleteCommentFunction = async (commentId: number) => {
    try {
      await deleteComments(commentId);
      dispatch(deleteComments(commentId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {loaded && <Loader />}

        {!loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loaded && !hasError && comments.length > 0 && (
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
                    onClick={() => deleteCommentFunction(comment.id)}
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

        {!loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
