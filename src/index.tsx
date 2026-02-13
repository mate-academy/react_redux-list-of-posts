import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

const Root = () =>
  process.env.NODE_ENV === 'test' ? (
    <Provider store={store}>
      <App />
    </Provider>
  ) : (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
