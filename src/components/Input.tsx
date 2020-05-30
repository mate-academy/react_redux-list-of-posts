import React from 'react';
import { useDispatch } from 'react-redux';
import { setQuery } from '../store/query';
import { debounce } from '../helpers/debounce';

export const SearchInput: React.FC = () => {
  const dispatch = useDispatch();

  const debounceWrapper = debounce(
    (value: string) => dispatch(setQuery(value)),
    1000,
  );

  const startDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceWrapper(e.target.value);
  };

  return (
    <div className="inputContainer">
      <input
        type="text"
        className="input"
        placeholder="write a text for search"
        onChange={startDebounce}
      />
    </div>
  );
};
