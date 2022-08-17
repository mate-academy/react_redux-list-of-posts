import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';

import { api } from './api/generalApi';
import { App } from './App';

const Root = () => (
  <ApiProvider api={api}>
    <Router>
      <App />
    </Router>
  </ApiProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
