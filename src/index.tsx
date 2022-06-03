import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
// eslint-disable-next-line import/no-named-as-default
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
