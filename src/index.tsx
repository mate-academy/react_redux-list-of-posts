import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { setupStore } from './store/index';

const store = setupStore();

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
