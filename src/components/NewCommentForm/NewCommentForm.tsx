import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NewCommentForm.scss';
import { NewComment, CommentFields } from '../../types';

import { useForm } from '../../helpers/useForm';

import { getPostCommentEdit } from '../../store/index';
import { addComment, setCommentsEdit, updateComment, setCommentsUpdated } from '../../store/commentsReducer';

interface NewCommentFormProps {
  postId: number;
}

export const NewCommentForm: React.FC<Pick<NewCommentFormProps, 'postId'>> = React.memo(({
  postId,
}) => {
  const commentEdit = useSelector(getPostCommentEdit);
  const dispatch = useDispatch();

  const initialValues: NewComment = {
    name: (commentEdit && commentEdit.name ? commentEdit.name : ''),
    email: (commentEdit && commentEdit.email ? commentEdit.email : ''),
    body: (commentEdit && commentEdit.body ? commentEdit.body : ''),
    postId: postId,
  };

  useEffect(() => {
    if (commentEdit) {
      formData.name = commentEdit.name;
      formData.email = commentEdit.email;
      formData.body = commentEdit.body;
    } else {
      resetForm();
      resetData();
    }
  }, [postId, commentEdit]);

  const {
    handleSubmit,
    handleChange,
    handleTextareaChange,
    resetData,
    isEditing,
    data: formData,
    errors
  } = useForm<CommentFields>({
    editing: !!commentEdit,
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
        updateCommentHandler(newCommentFields);
      } else {
        addCommentHandler(newCommentFields);
      }

      resetForm();
    },
  });

  const resetForm = () => {
    formData.name = '';
    formData.email = '';
    formData.body = '';
    initialValues.name = '';
    initialValues.email = '';
    initialValues.body = '';
  };

  const updateCommentHandler = async (comment: NewComment) => {
    const newComment = {
      ...comment,
      id: commentEdit.id,
    };

    await updateComment(commentEdit.id, newComment);
    dispatch(setCommentsUpdated(true));
  };

  const addCommentHandler = async (comment: NewComment) => {
    const date = Date.now().toString();
    const newId = Number(date.substr(date.length - 6));
    const newComment = {
      ...comment,
      id: newId,
    };

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
          value={formData.name || initialValues.name}
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
          value={formData.email || initialValues.email}
          onChange={handleChange('email')}
        />
        {errors.email && <p className="NewCommentForm__error">{errors.email}</p>}
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comments here"
          className="NewCommentForm__input"
          value={formData.body || initialValues.body}
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
        {isEditing() ? 'Update a comment' : 'Add a comment'}
      </button>
    </form>
  );
});
