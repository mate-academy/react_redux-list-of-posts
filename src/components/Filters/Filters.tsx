import React, { useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedUserId, setSelectedUserId } from '../../store/postsReducer';
import { getUsersList } from '../../store'

import debounce from 'lodash/debounce.js';

import { User } from '../../types';

export const Filters: React.FC = () => {
  const [queryTitle, setQueryTitle] = useState('');
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const userId = useSelector(getSelectedUserId);
  const users: User[] = useSelector(getUsersList);

  const dispatch = useDispatch();

  const applyQuery = useCallback(
    debounce((newQuery: string | null) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history.push({ search: searchParams.toString() });
    }, 350), [],
  );

  var handleChange = function(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.currentTarget.value;
    setQueryTitle(value);
    applyQuery(value);
  }

  var handleSelect = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;

    if (Number(value) > 0) {
      searchParams.set('userId', value);
      dispatch(setSelectedUserId(Number(value)));
    } else {
      searchParams.delete('userId');
    }
    history.push({ search: searchParams.toString() });
  }, [userId, dispatch]);

  if (users) {
    return (
      <>
        <label>
          Title: &nbsp;
          <input
            type="text"
            name="title"
            value={queryTitle}
            placeholder="Filter by title"
            className="App__header-filter"
            onChange={handleChange}
          />
        </label>

        <label>
          Select a user: &nbsp;

          <select
            name="user"
            className="App__user-selector"
            value={userId}
            onChange={handleSelect}
          >
            <option value="">
              Choose a user
            </option>
            {users.map((user: any) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </>
    )
  } else {
    return (
      <div className="App__loading-message">Loading data...</div>
    )
  }
}
