import React, { FC } from 'react';

import './Button.css';

interface Props {
  disabled?: boolean;
  onClick?(): void;
}


export const Button: FC<Props> = (props) => {
  const {
    disabled,
    onClick,
    children,
  } = props;

  return (
    <button
      type="button"
      className="load-btn"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
