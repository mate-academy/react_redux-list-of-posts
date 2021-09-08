import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NewCommentForm.scss';
import { NewComment, CommentFields } from '../../types';

import { useForm } from '../../helpers/useForm';

import { getPostCommentEdit } from '../../store/index';
import { addComment, setCommentsEdit, editComment, setCommentsUpdated } from '../../store/commentsReducer';

interface NewCommentFormProps {
  postId: number;
}

export const NewCommentForm: React.FC<Pick<NewCommentFormProps, 'postId'>> = React.memo(({
  postId,
}) => {
  const commentEdit = useSelector(getPostCommentEdit);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    handleChange,
    handleTextareaChange,
    data: formData,
    errors
  } = useForm<CommentFields>({
    validations: {
      name: {
        pattern: {
          value: '^[A-Za-z]*$',
          message:
            'You\'re not allowed to use special characters or numbers in your name.',
        },
      },
      email: {
        pattern: {
          value: '^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$',
          message: 'Your email is not valid.',
        },
      },
      body: {
        custom: {
          isValid: (value: string) => value.length < 151 && value.length > 3,
          message: 'The comment should have from 4 to 150 characters.',
        }
      },
    },
    onSubmit: () => {
      const newCommentFields = {
        ...initialValues,
        name: formData.name,
        email: formData.email,
        body: formData.body.replace(/^\s+|\s+$/g, ''),
      }

      if (commentEdit) {
        editCommentHandler(newCommentFields);
      } else {
        addCommentHandler(newCommentFields);
      }
      console.log(typeof editCommentHandler, typeof addCommentHandler, newCommentFields);

      resetForm();
    },
  });

  useEffect(() => {
    if (commentEdit) {
      formData.name = commentEdit.name;
      formData.email = commentEdit.email;
      formData.body = commentEdit.body;
    } else {
      resetForm();
    }
  }, [postId, commentEdit]);

  const initialValues: NewComment = {
    name: '',
    email: '',
    body: '',
    postId: postId,
  };

  const resetForm = () => {
    formData.name = '';
    formData.email = '';
    formData.body = '';
  };

  const editCommentHandler = async (comment: NewComment) => {
    const newComment = {
      ...comment,
      id: commentEdit.id,
    };

    console.log('Comment that has edited is ', newComment, commentEdit.id);

    await editComment(commentEdit.id, newComment);
    dispatch(setCommentsUpdated(true));
  };

  const addCommentHandler = async (comment: NewComment) => {
    const date = Date.now().toString();
    const newId = Number(date.substr(date.length - 6));
    const newComment = {
      ...comment,
      id: newId,
    };

    console.log('new comment is ', newComment);

    await addComment(newComment);
    dispatch(setCommentsUpdated(true));
    dispatch(setCommentsEdit(newId));
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(ev) => {
        ev.preventDefault();
        handleSubmit(ev);
      }}
      method="POST"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={formData.name || ''}
          onChange={handleChange('name')}
          required
        />
        {errors.name && <p className="NewCommentForm__error">{errors.name}</p>}
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={formData.email || ''}
          onChange={handleChange('email')}
        />
        {errors.email && <p className="NewCommentForm__error">{errors.email}</p>}
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comments here"
          className="NewCommentForm__input"
          value={formData.body || ''}
          required
          onChange={(ev) => {
            handleTextareaChange('body', ev.target.value);
          }}
        />
        {errors.body && <p className="NewCommentForm__error">{errors.body}</p>}
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
});
