import React from 'react';

export const SpinnerLoad = () => {
  return (
    <div className="Spinner__Container">
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
