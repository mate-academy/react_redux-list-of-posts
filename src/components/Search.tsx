import React from 'react';

export const Search = ({ handleSearch, query }: SearchProps) => {

  return (
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <textarea
              id="textarea1"
              value={query}
              className="materialize-textarea"
              onChange={handleSearch}
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
