import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getSelectedUserId, getUsersList } from '../../store';
import { setSelectedUserId } from '../../store/postsReducer';

import debounce from 'lodash/debounce.js';

import { User } from '../../types';

export const Filters: React.FC = () => {
  const [queryTitle, setQueryTitle] = useState('');
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const userId = useSelector(getSelectedUserId);
  const users: User[] = useSelector(getUsersList);
  // const loading: boolean = useSelector(isLoading);

  // andy@gmail.com

  const dispatch = useDispatch();

  const applyQuery = debounce((newQuery: string | null) => {
    if (newQuery && newQuery.length > 0) {
      searchParams.set('query', newQuery);
    } else {
      searchParams.delete('query');
    }

    history.push({ search: searchParams.toString() });
  }, 350);

  var handleChange = function(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.currentTarget.value;
    setQueryTitle(value);
    applyQuery(value);
  }

  var handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;

    if (Number(value) > 0) {
      searchParams.set('userId', value);
      dispatch(setSelectedUserId(Number(value)));
    } else {
      searchParams.delete('userId');
      dispatch(setSelectedUserId(0));
    }
    history.push({ search: searchParams.toString() });
  };

  if (users) {
    return (
      <>
        <div className="group group--left">
          <label htmlFor="title">
            Title: &nbsp;
          </label>
          <input
            type="text"
            name="title"
            value={queryTitle}
            placeholder="Filter by title"
            onChange={handleChange}
          />
        </div>

        {/* {loading ? (
          <div className="info">Loading users...</div>
        ) : ( */}
          <div className="group group--left">
            <label htmlFor="user">
              Select a user: &nbsp;
            </label>
            <select
              name="user"
              value={userId}
              onChange={handleSelect}
            >
              <option value="">
                All users
              </option>
              {users.map((user: any) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        {/* )} */}
      </>
    )
  } else {
    return (
      <div className="info">No users data</div>
    )
  }
}
