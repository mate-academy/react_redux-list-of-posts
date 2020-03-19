import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import './FilterField.css';

interface FilterFieldInterface {
  setFiledQuery: (arg0: string) => void;
}

export const FilterField: FC<FilterFieldInterface> = ({ setFiledQuery }) => {
  const [serachQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setFiledQuery(serachQuery);
  }, [serachQuery]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="field filter-field">
      <div className="control">
        <input
          className="input is-medium is-rounded"
          type="text"
          placeholder="Search..."
          value={serachQuery}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
