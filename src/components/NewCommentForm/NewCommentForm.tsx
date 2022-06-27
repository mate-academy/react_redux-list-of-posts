import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostsActionCreators }
  from '../../redux/reducers/posts/action-creators';
import { SelectedPost } from '../../redux/reducers/posts/selectors';
import './NewCommentForm.scss';

export const NewCommentForm: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPostId = useSelector(SelectedPost);

  const [formValue, setFormValue] = useState({
    nameValue: '',
    emailValue: '',
    bodyValue: '',
  });

  const changeNameHandler = (value: string) => {
    setFormValue((state) => ({
      ...state,
      nameValue: value,
    }));
  };

  const changeEmailHandler = (value: string) => {
    setFormValue((state) => ({
      ...state,
      emailValue: value,
    }));
  };

  const changeBodyHandler = (value: string) => {
    setFormValue((state) => ({
      ...state,
      bodyValue: value,
    }));
  };

  const addNewCommentHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedPostId) {
      const comment = {
        name: formValue.nameValue,
        email: formValue.emailValue,
        body: formValue.bodyValue,
        postId: selectedPostId,
      };

      dispatch(PostsActionCreators.addNewComment(comment));
      setFormValue({
        nameValue: '',
        emailValue: '',
        bodyValue: '',
      });
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(e) => addNewCommentHandler(e)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={formValue.nameValue}
          onChange={(e) => changeNameHandler(e.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={formValue.emailValue}
          onChange={(e) => changeEmailHandler(e.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={formValue.bodyValue}
          onChange={(e) => changeBodyHandler(e.target.value)}
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
