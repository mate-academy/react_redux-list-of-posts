import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../store/filter';

export const Filter = () => {
  const dispath = useDispatch();
  const filterChange = (e: { target: HTMLInputElement }) => {
    dispath(setFilter(e.target.value));
  };

  return (
    <div className="form-group">
      <input
        className="form-control form-control-lg"
        onChange={filterChange}
        type="text"
        placeholder="Find post..."
      />
    </div>
  );
};
