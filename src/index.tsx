import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import { store } from './app/store';
import { App } from './App';

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

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(<Root />);
} else {
  throw new Error('Root element not found');
}
