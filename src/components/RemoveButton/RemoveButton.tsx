import React from 'react';

import './RemoveButton.css';

type Props = {
  size: string;
  onClick: () => void;
};

export const RemoveButton: React.FC<Props> = ({ onClick, size }) => (
  <button
    className={`remove-btn remove-btn--${size}`}
    type="button"
    onClick={onClick}
    aria-label="remove button"
  />
);
