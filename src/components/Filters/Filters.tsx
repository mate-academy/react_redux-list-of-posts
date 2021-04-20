import React, { useCallback, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setPostID } from '../../store/postReducer';

import debounce from 'lodash/debounce';

export const Filters = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const selectedUserId = searchParams.get('selectedId') || '';

  const applyQuery = useCallback(
    debounce((newQuery: string | null) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      history.push({ search: searchParams.toString() });
    }, 500), [],
  );

  const selectUserPosts = useCallback((user) => {
    if (Number(user)) {
      searchParams.set('selectedId', user);
      dispatch(setPostID(0));
    } else {
      searchParams.delete('selectedId');
    }

    history.push({ search: searchParams.toString() });
  }, [selectedUserId]);

  return (
    <header className="App__header">
      <label>
        Title: &nbsp;
        <input
          type="text"
          name="title"
          value={query}
          placeholder="Search by title"
          className="App__user-input"
          onChange={(e) => {
            const { value } = e.target;
            setQuery(value);
            applyQuery(value);
          }}
        />
      </label>
      <label>
        Select a user: &nbsp;
        <select
          className="App__user-selector"
          value={selectedUserId}
          onChange={(event) => {
            const { value } = event.target;
            selectUserPosts(value);
          }}
        >
          <option value="0">All users</option>
          <option value="1">Leanne Graham</option>
          <option value="2">Ervin Howell</option>
          <option value="3">Clementine Bauch</option>
          <option value="4">Patricia Lebsack</option>
          <option value="5">Chelsey Dietrich</option>
          <option value="6">Mrs. Dennis Schulist</option>
          <option value="7">Kurtis Weissnat</option>
          <option value="8">Nicholas Runolfsdottir V</option>
          <option value="9">Glenna Reichert</option>
          <option value="10">Leanne Graham</option>
        </select>
      </label>
  </header>
  );
};
