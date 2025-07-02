import { useState } from 'react';
import { CommentData } from '../types/Comment';

export const useNewCommentForm = (
  onSubmit: (data: CommentData) => Promise<void>,
) => {
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const [{ name, email, body }, setValues] = useState({
    name: '',
    email: '',
    body: '',
  });

  const clearForm = () => {
    setValues({
      name: '',
      email: '',
      body: '',
    });

    setErrors({
      name: false,
      email: false,
      body: false,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;

    setValues(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: false }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrors({
      name: !name,
      email: !email,
      body: !body,
    });

    if (!name || !email || !body) {
      return;
    }

    setSubmitting(true);

    await onSubmit({ name, email, body });

    setSubmitting(false);
    setValues(current => ({ ...current, body: '' }));
  };

  return {
    name,
    email,
    body,
    submitting,
    errors,
    clearForm,
    handleChange,
    handleSubmit,
  };
};
