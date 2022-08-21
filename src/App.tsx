import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppUsers } from './features/AppUsers';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route
          path=":userId"
          element={(
            <AppUsers />
          )}
        >
          <Route
            path=":postId"
            element={(
              <AppUsers />
            )}
          />
        </Route>
        <Route />
        <Route
          index
          element={(
            <AppUsers />
          )}
        />
      </Route>
    </Routes>
  );
};
