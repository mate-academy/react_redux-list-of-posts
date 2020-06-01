import React, { ChangeEvent } from 'react';

interface Props {
  startDebounce: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<Props> = ({ startDebounce }) => {


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
