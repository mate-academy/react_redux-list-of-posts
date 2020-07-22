import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterOption } from '../store';
import { setFilterOption } from '../store/filterOption';

export const SearchField = () => {
  const inputValue = useSelector(getFilterOption);
  const dispatch = useDispatch();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    dispatch(setFilterOption(value));
  };

  return (
    <div className="input-field col s12">
      <input
        className="input validate"
        id="text"
        placeholder="Search"
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};
