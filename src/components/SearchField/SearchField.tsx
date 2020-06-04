import React, { useState, useCallback, FormEvent } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setQuery } from '../../store/query';
import './SearchField.css';

const SearchField = () => {
  const dispatch = useDispatch();
  const [visibleQuery, setVisibleQuery] = useState<string>('');

  const dispatchWithDebounce = useCallback(debounce(dispatch, 500), []);

  const handleSetQuery = (event: FormEvent<HTMLInputElement>) => {
    const newQuery = event.currentTarget.value;

    setVisibleQuery(newQuery);
    dispatchWithDebounce(setQuery(newQuery));
  };

  return (
    <input
      type="text"
      value={visibleQuery}
      placeholder="Posts filter"
      onChange={(event) => handleSetQuery(event)}
    />
  );
};

export default SearchField;
