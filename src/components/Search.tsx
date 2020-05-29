import React from 'react';
import { useSelector } from 'react-redux';
import { getQuery } from '../store';

export const Search = ({ handleSearch }: SearchProps) => {
  const query = useSelector(getQuery);

  return (
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <textarea
              id="textarea1"
              value={query}
              className="materialize-textarea"
              onChange={(event) => handleSearch(event)}
            />
            <label htmlFor="textarea1">
              Type something to search post...
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
