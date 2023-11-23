import { createRoot } from 'react-dom/client';
// import ReactDOM from 'react-dom';
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

const root = createRoot(document.getElementById('root')!);

root.render(
  <Root />,
);
