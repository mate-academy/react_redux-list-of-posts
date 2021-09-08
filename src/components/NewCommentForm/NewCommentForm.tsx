import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NewCommentForm.scss';
import { NewComment } from '../../types';

import { getPostCommentEdit } from '../../store/index';
import { addComment, setCommentsEdit, editComment, setCommentsUpdated } from '../../store/commentsReducer';

interface NewCommentFormProps {
  postId: number;
}

export const NewCommentForm: React.FC<NewCommentFormProps> = React.memo(({
  postId,
}) => {
  const initialValues: NewComment = {
    name: '',
    email: '',
    body: '',
    postId: postId,
  };

  const [newComment, setNewComment] = useState<NewComment>(initialValues);
  const commentEdit = useSelector(getPostCommentEdit);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (commentEdit) {
      console.log(111);
      setNewComment({
        ...initialValues,
        name: commentEdit.name,
        email: commentEdit.email,
        body: commentEdit.body,
      });
    } else {
      console.log(222);
      setNewComment(initialValues);
    }
  }, [postId, commentEdit]);

  const resetForm = () => {
    setNewComment({
      name: '',
      email: '',
      body: '',
      postId: postId,
    });
  };

  // ' ... ... ...   '.replace(/^\s+|\s+$/g, '')
  const validateForm = (newComment: NewComment) => {
    let isFormValid = true;
    if (!newComment.name.length) {
      isFormValid = false;
    }

    return isFormValid;
  };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;

    setNewComment(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = (ev: React.FormEvent) => {
    ev.preventDefault();

    if (validateForm(newComment) === true) {
      if (commentEdit) {
        editCommentHandler(newComment);
      } else {
        addCommentHandler(newComment);
      }
      setNewComment(initialValues);
      resetForm();
    } else {
      console.log('Write message');
    }
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
      onSubmit={handleSubmitForm}
      method="POST"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newComment.name}
          onChange={handleChangeInput}
        />
        {/* {errors.name
          && <p className="NewCommentForm__error">{errors.name.message}</p>
        } */}
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newComment.email}
          onChange={handleChangeInput}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comments here"
          className="NewCommentForm__input"
          value={newComment.body}
          // {...register('body', {
          //   required: 'Message text is required.',
          //   minLength: {
          //     value: 5,
          //     message: 'Minimal length of message text is 5.',
          //   },
          //   pattern: {
          //     value: /^$|.*\S+.*/,
          //     message: 'Message should\'t be made up of whitespaces.',
          //   },
          // })}
          onChange={handleChangeInput}
        />
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
