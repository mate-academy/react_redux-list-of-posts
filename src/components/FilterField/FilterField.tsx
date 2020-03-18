import React from 'react';
import './FilterField.css';

export const FilterField = () => {
  return (
    <div className="field filter-field">
      <div className="control">
        <input className="input is-medium is-rounded" type="text" placeholder="Search..." />
      </div>
    </div>
  );
};
