import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PostApp } from './features/postApp/PostApp';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<PostApp />} />
        <Route path=":userId" element={<PostApp />} />
      </Route>
    </Routes>
  );
};
