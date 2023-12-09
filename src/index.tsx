import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import { store } from './app/store';
import { App } from './App';

const Root = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

/* eslint-disable react/no-deprecated */
ReactDOM.render(<Root />, document.getElementById('root'));
/* eslint-enable react/no-deprecated */
