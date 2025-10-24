// src/components/NewCommentForm.tsx

import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  // 1. ALTERADO: A função agora é síncrona, pois apenas dispara uma ação Redux
  // (O PostDetails que lida com o async/await do Thunk)
  onSubmit: (data: CommentData) => void;

  // 2. NOVO: Adicionamos onCancel para que o PostDetails possa fechar o formulário
  onCancel: () => void;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  // A lógica de estado local (inputs, erros, submitting) é MANTIDA.

  // No Redux, o 'submitting' (loading) não é gerenciado localmente,
  // mas sim pelo Redux. No entanto, para fins práticos (e para manter o spinner
  // de forma simples), podemos mantê-lo aqui, mas ele deve ser resetado
  // logo após o dispatch.
  // Alternativamente, se o onSubmit for o Thunk, o PostDetails gerencia o async.
  // Vamos manter a prop original para simplificar.
  const [submitting, setSubmitting] = useState(false);

  // ... (Restante do estado local: errors, values) ...
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

  const handleSubmit = (event: React.FormEvent) => {
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
    // A chamada não é mais 'await', é apenas um dispatch síncrono da ação
    onSubmit({ name, email, body });
    setSubmitting(false);

    // Resetamos o corpo do comentário, mas mantemos nome e email (como antes)
    setValues(current => ({ ...current, body: '' }));
  };

  // 3. Renderização: Adiciona o botão de Cancelar e a chamada a onCancel
  return (
    <form onSubmit={handleSubmit} onReset={clearForm} data-cy="NewCommentForm">
      {/* ... (Todos os campos do formulário permanecem inalterados) ... */}

      {/* CAMPO NOME */}
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': errors.name })}
            value={name}
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      {/* CAMPO EMAIL */}
      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errors.email })}
            value={email}
            onChange={handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      {/* CAMPO BODY */}
      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>
        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': errors.body })}
            value={body}
            onChange={handleChange}
          />
        </div>
        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              // A lógica de 'is-loading' é mantida no componente, mas você deve
              // garantir que o setSubmitting seja usado no PostDetails se quiser
              // refletir o estado de carregamento do Thunk.
              'is-loading': submitting,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>

        {/* NOVO: Botão de Cancelar */}
        <div className="control">
          <button
            type="button" // Use 'button' para evitar submissão do form
            className="button is-danger is-light"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
