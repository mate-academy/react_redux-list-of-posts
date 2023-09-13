import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import { store } from './app/store';
import { App } from './App';

const Root = () => (
  <Provider store={store}>
    {/* Remove UsersProvider when you move users to Redux store */}
    <Router>
      <App />
    </Router>
  </Provider>
);

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(<Root />, document.getElementById('root'));
