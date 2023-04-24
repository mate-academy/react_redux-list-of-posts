import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import { store } from './app/store';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  );

// ReactDOM.render(<Root />, document.getElementById('root'));
