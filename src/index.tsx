import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import { store } from './app/store';
import { App } from './App';
// import { UsersProvider } from './components/UsersContext';

const Root = () => (
  <Provider store={store}>
    {/* Remove UsersProvider when you move users to Redux store */}
    {/* <UsersProvider> */}
    <Router>
      <App />
    </Router>
    {/* </UsersProvider> */}
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
