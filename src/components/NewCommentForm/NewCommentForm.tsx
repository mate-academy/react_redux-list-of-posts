import {
  FC,
  ChangeEvent,
  FormEvent,
  useCallback,
  useState,
} from 'react';
import { Loader } from '../Loader';
import {
  useAppDispatch,
  useAppSelector,
} from '../../typedHooks/hooks';
import {
  selectors,
  addCommentInSelectedPost,
} from '../../store/postDetailsSlice';

import './NewCommentForm.scss';

type Props = {
  selectedPostId: number;
};

export const NewCommentForm: FC<Props> = ({
  selectedPostId,
}) => {
  const dispatch = useAppDispatch();
  const isUploadComment = useAppSelector(selectors.getSomeCommentIsDeleting);
  const initialState = {
    postId: selectedPostId,
    name: '',
    email: '',
    body: '',
  };

  const initialError = {
    name: '',
    email: '',
    body: '',
  };

  const [newComment, setNewComment] = useState(initialState);
  const [newCommentError, setNewCommentError] = useState(initialError);

  const catchInpChange = useCallback(async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = event.target;

    setNewComment(prev => ({ ...prev, [name]: value, postId: selectedPostId }));
  }, [selectedPostId, newComment]);

  const catchSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    setNewCommentError({ ...initialError });

    if (!newComment.name.trim()) {
      setNewCommentError(prev => ({ ...prev, name: 'Enter title!' }));
    }

    if (!newComment.body.trim()) {
      setNewCommentError(prev => ({ ...prev, body: 'Enter comment!' }));
    }

    if (!newComment.email.trim()) {
      setNewCommentError(prev => ({ ...prev, email: 'Enter email!' }));
    }

    const validComment = Object.values(newComment)
      .every(item => String(item).trim());
    const validErrors = Object.values(newCommentError).some(item => item);

    if (validComment && !validErrors) {
      dispatch(addCommentInSelectedPost(newComment));
      setNewComment(initialState);
    }
  }, [newComment, newCommentError]);

  return (
    <>
      {!isUploadComment
        ? (
          <form
            className="NewCommentForm"
            onSubmit={catchSubmit}
          >
            <div className="form-field">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="NewCommentForm__input"
                onChange={catchInpChange}
                value={newComment.name}
              />
              {newCommentError.name && (
                <p className="error-message">{newCommentError.name}</p>
              )}
            </div>

            <div className="form-field">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="NewCommentForm__input"
                onChange={catchInpChange}
                value={newComment.email}
              />
              {newCommentError.email && (
                <p className="error-message">{newCommentError.email}</p>
              )}
            </div>

            <div className="form-field">
              <textarea
                name="body"
                placeholder="Type comment here"
                className="NewCommentForm__input"
                onChange={catchInpChange}
                value={newComment.body}
              />
              {newCommentError.body && (
                <p className="error-message">{newCommentError.body}</p>
              )}

            </div>

            <button
              type="submit"
              className="NewCommentForm__submit-button button"
            >
              Add a comment
            </button>
          </form>
        )
        : (
          <>
            <h2>
              Updating data
            </h2>
            <Loader />
          </>
        )}
    </>
  );
};
