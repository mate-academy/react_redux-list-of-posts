import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getPostId, createComment } from '../../store';
import './NewCommentForm.scss';

export const NewCommentForm: React.FC = () => {
  const dispatch = useDispatch();
  const postId = useSelector(getPostId);
  const [form, setForm] = useState({
    body: '',
    email: '',
    name: '',
  });
  const [isValidForm, setIsValidForm] = useState(true);

  // eslint-disable-next-line no-useless-escape
  const validator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const changeInput = (event: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setIsValidForm(true);

    switch (name) {
      case 'body':
        setForm({
          ...form,
          body: value,
        });
        break;

      case 'email':
        setForm({
          ...form,
          email: value,
        });
        break;

      case 'name':
        setForm({
          ...form,
          name: value,
        });
        break;

      default:
        break;
    }
  };

  const resetForm = () => {
    setForm({
      body: '',
      email: '',
      name: '',
    });
    setIsValidForm(true);
  };

  const validation = useMemo(() => {
    return (form.name.length > 0
      && form.body.length > 0
      && validator.test(form.email)
    );
  }, [form]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validation) {
      const newComment = {
        postId,
        body: form.body,
        email: form.email,
        name: form.name,
      };

      dispatch(createComment(newComment));
      resetForm();
    } else {
      setIsValidForm(false);
    }
  };

  useEffect(() => {
    resetForm();
  }, [postId]);

  return (
    <form
      className="NewCommentForm"
      onSubmit={onSubmit}
    >
      {!isValidForm && (
        <p className="NewCommentForm__error">Enter correct information</p>
      )}

      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          className={classNames(
            'NewCommentForm__input',
            {
              'NewCommentForm__input--error':
                (!isValidForm && form.name.length === 0),
            },
          )}
          onChange={changeInput}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          value={form.email}
          className={classNames(
            'NewCommentForm__input',
            {
              'NewCommentForm__input--error':
                (!isValidForm && !validator.test(form.email)),
            },
          )}
          onChange={changeInput}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={form.body}
          className={classNames(
            'NewCommentForm__input',
            {
              'NewCommentForm__input--error':
                (!isValidForm && form.body.length === 0),
            },
          )}
          onChange={changeInput}
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
