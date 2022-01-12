import {
  FC, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { AuthActionCreators } from '../../../store/auth';

export const LoginForm: FC = () => {
  const [email, setEmail] = useState('user');
  const [password, setPassword] = useState('123');

  const dispatch = useDispatch();

  const { error, isLoading } = useTypedSelector(state => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(AuthActionCreators.login(email, password));
  };

  return (
    <div className="FormLoginWrapper">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {error && (
          <div style={{ color: 'red' }}>
            {error}
          </div>
        )}
        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label"
          >
            Email address

            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password

            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};
