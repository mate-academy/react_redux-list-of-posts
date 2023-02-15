import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  loadComments,
  removeComment,
} from '../features/CommentSlice';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const {
    comments,
    status,
  } = useAppSelector(state => state.comments);
  const [visibleComments, setVisibleComments] = useState<Comment[]>(comments);
  const selectedPostId = useAppSelector(state => state.posts.selectedPost);
  const selectedPost = useAppSelector(state => state.posts.posts)
    .find(post => post.id === selectedPostId);
  const dispatch = useAppDispatch();
  const isLoading = status === 'loading';
  const isError = status === 'failed';
  const deletedCommentId = useAppSelector(state => (
    state.comments.deletedCommentId
  ));

  const deleteCommetnHandler = (commentId: number) => {
    setVisibleComments(prev => prev.filter(comment => (
      comment.id !== commentId
    )));
    dispatch(removeComment(commentId));
  };

  useEffect(() => {
    if (selectedPost) {
      dispatch(loadComments(selectedPost.id));
      setVisible(false);
    }
  }, [selectedPost]);

  useEffect(() => {
    if (status === 'idle') {
      setVisibleComments(comments);
    }
  }, [status, comments]);

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

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectedPost?.body}
        </p>
      </div>

      <div className="block">
        {isLoading && (
          <Loader />
        )}

        {!isLoading && isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !isError && visibleComments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !isError && visibleComments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {visibleComments.map(comment => (
              <article
                className={cn(
                  'message is-small',
                  { 'is-hidden': deletedCommentId.includes(comment.id) },
                )}
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
                    onClick={() => deleteCommetnHandler(comment.id)}
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

        {!isLoading && !isError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !isError && visible && (
          <NewCommentForm postId={selectedPostId} />
        )}
      </div>
    </div>
  );
};
