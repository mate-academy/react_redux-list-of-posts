import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
// import { Comment, CommentData } from '../types/Comment';
import { clientAPI } from '../app/clientApi';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const {
    data: comments = [],
    isLoading,
    isError,
  } = clientAPI.useFetchAllCommentsQuery(post.id);
  const [
    deleteComment,
    { isLoading: updateAfterDelete },
  ] = clientAPI.useDeleteCommentMutation();
  const [visible, setVisible] = useState(false);

  // function loadComments() {
  //   setVisible(false);
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

  // const addComment = async ({ name, email, body }: CommentData) => {
  //   try {
  //     const newComment = await commentsApi.createComment({
  //       name,
  //       email,
  //       body,
  //       postId: post.id,
  //     });

  //     setComments(
  //       currentComments => [...currentComments, newComment],
  //     );

  //     // setComments([...comments, newComment]);
  //     // works wrong if we wrap `addComment` with `useCallback`
  //     // because it takes the `comments` cached during the first render
  //     // not the actual ones
  //   } catch (error) {
  //     // we show an error message in case of any error
  //     setError(true);
  //   }
  // };

  return (
    <div className="content">
      <div className="block">
        <h2>
          {`#${post.id}: ${post.title}`}
        </h2>
        <p>{post.body}</p>
      </div>

      <div className="block">
        {(isLoading || updateAfterDelete) && <Loader />}

        {!isLoading && isError && (
          <div className="notification is-danger">
            Something went wrong
          </div>
        )}

        {!isLoading
          && !isError
          && comments.length === 0
          && !updateAfterDelete
          && (
            <p className="title is-4">No comments yet</p>
          )}

        {!isLoading && !isError && comments.length > 0 && (
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
                    onClick={() => deleteComment(comment.id)}
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

        {!isLoading && !isError && !visible && (
          <button
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isLoading && !isError && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
