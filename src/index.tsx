import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import { App } from './App';
import { ReduxStore } from './app/store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const Root = () => (
  <Provider store={ReduxStore}>
    <Router>
      <App />
    </Router>
  </Provider>
);

root.render(<Root />);
