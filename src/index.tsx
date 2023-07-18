import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { store } from './app/store';
import { App } from './App';

const Root = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

// ReactDOM.render(<Root />, document.getElementById('root'));

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(<Root />);
}
