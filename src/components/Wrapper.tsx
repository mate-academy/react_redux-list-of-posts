import React, { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode | ReactNode[]
};

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <main className="section">
    <div className="container">
      <div className="tile is-ancestor">
        {children}
      </div>
    </div>
  </main>
);

export default Wrapper;
