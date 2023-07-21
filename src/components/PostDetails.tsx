import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Error } from '../types/Error';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteComment } from '../api/comments';
import {
  changeErrorComment,
  initComments,
  removeComment,
} from '../features/comments';

export const PostDetails = () => {
  const dispatch = useAppDispatch();
  const [openForm, setOpenForm] = useState(false);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const {
    comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);

  useEffect(() => {
    setOpenForm(false);
    dispatch(changeErrorComment(Error.None));

    if (selectedPost) {
      dispatch(initComments(selectedPost.id));
    }
  }, [selectedPost]);

  const handleDeleteComment = (id: number) => {
    deleteComment(id)
      .then(() => {
        dispatch(removeComment(id));
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
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
          {loaded && (
            <Loader />
          )}

          {(hasError !== Error.None && !loaded) && (
            <div className="notification is-danger" data-cy="CommentsError">
              {hasError}
            </div>
          )}

          {(!comments.length && !loaded && !hasError) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(!!comments.length && !loaded && !hasError) && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => {
                const {
                  name,
                  body,
                  email,
                  id,
                } = comment;

                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={id}
                  >
                    <div className="message-header">
                      <a href={`mailto:${email}`} data-cy="CommentAuthor">
                        {name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDeleteComment(id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {body}
                    </div>
                  </article>
                );
              })}
            </>
          )}

          {(!openForm && !loaded) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setOpenForm(true)}
            >
              Write a comment
            </button>
          )}

          {openForm && (
            <NewCommentForm />
          )}
        </div>
      </div>
    </div>
  );
};
