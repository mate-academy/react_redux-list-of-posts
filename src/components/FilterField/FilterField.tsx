import React, {ChangeEvent, FC, useEffect, useMemo, useState} from 'react';
// @ts-ignore
import debounce from 'lodash/debounce';

import './FilterField.css';

interface FilterFieldInterface {
  setFiledQuery: (arg0: string) => void;
}

export const FilterField: FC<FilterFieldInterface> = ({ setFiledQuery }) => {
  const [serachQuery, setSearchQuery] = useState('');
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');

  useEffect(() => {
    setFiledQuery(serachQuery);
  }, [serachQuery]);

  const setWithDebounce = useMemo(
    () => debounce(setSearchQuery, 500),
    [serachQuery],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentSearchQuery(event.target.value);
    setWithDebounce(event.target.value);
  };

  return (
    <div className="field filter-field">
      <div className="control">
        <input
          className="input is-medium is-rounded"
          type="text"
          placeholder="Search..."
          value={currentSearchQuery}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
