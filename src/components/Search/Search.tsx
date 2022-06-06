import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { setQuery } from '../../store/query';

export const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [titleQuery, setTitleQuery] = useState('');
  const delay = 1000;
  const applyQuery = debounce((query) => dispatch(setQuery(query)), delay);

  const handleQuery = (query: string) => {
    setTitleQuery(query);
    applyQuery(query);
  };

  return (
    <label>
      Search: &nbsp;
      <input
        className="App__user-selector"
        type="text"
        value={titleQuery}
        onChange={({ target }) => {
          handleQuery(target.value);
        }}
        data-cy="filterByTitle"
      />
    </label>
  );
};
