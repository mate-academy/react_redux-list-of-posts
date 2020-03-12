import React, { FC } from 'react';

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
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
