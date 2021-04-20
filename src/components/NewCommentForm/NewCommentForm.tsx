import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './NewCommentForm.scss';

import { getCommentsList, getPostId } from '../../store';
import { setComments } from '../../store/commentPostReducer';

import { createComment } from '../../helpers/api';
import { NEWCOMMENT } from '../../type';

export const NewCommentForm = () => {
  const dispatch = useDispatch();
  const postId = useSelector(getPostId);
  const comments = useSelector(getCommentsList);
  const [commentFields, setCommentFields] = useState({
    body: '',
    name: '',
    email: '',
  });

  const resetForm = () => {
    setCommentFields({
      body: '',
      name: '',
      email: '',
    });
  };

  const setForm = (event: any) => {
    const { name, value } = event.target;

    setCommentFields(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        const newComment: NEWCOMMENT = {
          ...commentFields, 
          postId, 
          id: Number(new Date()) 
        }

        dispatch(setComments([...comments,newComment]));
        createComment({...commentFields,postId })
        resetForm();
      }}
    >
      <div className="form-field">
        <input
          required
          type="text"
          name="name"
          value={commentFields.name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(e) => setForm(e)}
        />
      </div>
      
      <div className="form-field">
        <input
          required
          type="text"
          name="email"
          value={commentFields.email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(e) => setForm(e)}
        />
      </div>

      <div className="form-field">
        <textarea
          required
          name="body"
          placeholder="Type comment here"
          value={commentFields.body}
          className="NewCommentForm__input"
          onChange={(e) => setForm(e)}
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
};
