import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import ReactDOM from 'react-dom';
import { store } from './app/store';
import { App } from './App';
/* eslint-disable react/no-deprecated */

const Root = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
