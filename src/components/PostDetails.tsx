import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

// import * as commentsApi from '../api/comments';

// import { Post } from '../types/Post';
// import {
//   // Comment,
//   // CommentData,
// } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCurrentPost } from '../features/posts/postsSLice';
import {
  deleteCommentByCommentId,
  selectComments,
  selectCommentsStatus,
  getCommentsByPostId,
  deleteCommentThunk,
} from '../features/comments/commentsSlice';
// import { Dispatch } from '@reduxjs/toolkit';

type Props = {
  // post: Post;
};

export const PostDetails: React.FC<Props> = () => {
  // const [comments, setComments] = useState<Comment[]>([]);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  const post = useAppSelector(selectCurrentPost);
  const comments = useAppSelector(selectComments);
  const statusCommentsDownload = useAppSelector(selectCommentsStatus);
  const dispatch = useAppDispatch();

  // function loadComments() {
  //   setLoaded(false);
  //   setError(false);
  //   setVisible(false);

  //   commentsApi.getPostComments(post.id)
  //     .then(setComments) // save the loaded comments
  //     .catch(() => setError(true)) // show an error when something went wrong
  //     .finally(() => setLoaded(true)); // hide the spinner
  // }

  useEffect(() => {
    // loadComments();
    if (post?.id) {
      dispatch(getCommentsByPostId(post.id));
    }
  }, [post?.id]);

  // useEffect(() => {
  //   if (post?.id) {
  //     dispatch(getCommentsByPostId(post.id));
  //   }
  // }, []);

  // const deleteCommentHandler = (commentId: number) => {
  //   return (dispatch: Dispatch) => {
  //     dispatch(deleteCommentByCommentId(commentId));
  //     dispatch(getCommentsByPostId(postId));
  //   };
  // };

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

  // const deleteComment = async (commentId: number) => {
  //   // we delete the comment immediately so as
  //   // not to make the user wait long for the actual deletion
  //   setComments(
  //     currentComments => currentComments.filter(
  //       comment => comment.id !== commentId,
  //     ),
  //   );

  //   await commentsApi.deleteComment(commentId);
  // };

  return post && (
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
        {statusCommentsDownload === 'loading' && (
          <Loader />
        )}

        {statusCommentsDownload === 'failed' && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        { statusCommentsDownload === 'idle'
          && comments.length === 0
          && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

        <div
          style={{
            boxSizing: 'border-box',
            // border: '1px solid red',
          }}
        >
          { statusCommentsDownload === 'idle'
            && comments.length > 0
            && (
              <>
                <p className="title is-4">Comments:</p>

                {comments.map(comment => (
                  <article
                    className="message is-small"
                    key={comment.id}
                    data-cy="Comment"
                    // style={{
                    //   boxSizing: 'border-box',
                    //   border: '1px solid red',
                    // }}
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
                        onClick={() => {
                          // deleteComment(comment.id);
                          dispatch(deleteCommentByCommentId(comment.id));
                          // dispatch(deleteCommentThunk(post.id, comment.id));
                        }}
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
        </div>

        {/* {comments.map(comment => (
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
                onClick={() => {
                  // deleteComment(comment.id);
                }}
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {comment.body}
            </div>
          </article>
        ))} */}

        { statusCommentsDownload === 'idle'
          && !visible
          && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setVisible(true)}
            >
              Write a comment
            </button>
          )}

        { statusCommentsDownload === 'idle'
          && visible
          && (
            <NewCommentForm />
          )}
      </div>
    </div>
  );
};
