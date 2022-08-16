import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { App } from './App';
import { api } from './app/ReduxToolKitApi';

import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';

const Root = () => (
  <ApiProvider api={api}>
    <Router>
      <App />
    </Router>
  </ApiProvider>

);

ReactDOM.render(<Root />, document.getElementById('root'));
