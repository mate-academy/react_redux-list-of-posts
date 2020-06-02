import React, { useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { debounce } from '../../helpers';

export const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query')?.toLowerCase() || '';
  const [visibleQuery, setVisibleQuery] = useState(query);

  const updateQuery = useCallback(debounce(
    (actualQuery: string): void => {
      if (actualQuery === '') {
        searchParams.delete('query');
      } else {
        searchParams.set('query', actualQuery);
      }

      history.push({ search: searchParams.toString() });
    },
    1000,
  ), []);

  const handleQueryUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    updateQuery(value);
    setVisibleQuery(value);
  };

  return (
    <div className="field">
      <div className="control">
        <input
          className="input is-primary"
          type="text"
          placeholder="Input text"
          value={visibleQuery}
          onChange={handleQueryUpdate}
        />
      </div>
    </div>
  );
};
