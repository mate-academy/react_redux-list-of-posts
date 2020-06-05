import React from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import { Start } from './components/Start';
import { isLoading, getMessage } from './store';

const App = () => {
  const loading = useSelector(isLoading);
  const message = useSelector(getMessage);

  return (
    <div className="App">
      <h2>{loading ? 'Loading...' : message}</h2>
      <Start />
    </div>
  );
};

export default App;
