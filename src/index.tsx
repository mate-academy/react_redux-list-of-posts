import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { store } from './app/store';
import { App } from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const Root = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/:user?" element={<App />}></Route>
      </Routes>
    </Router>
  </Provider>
);

root.render(<Root />);
