import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client';
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

ReactDOM.render(<Root />, document.getElementById('root'));

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement,
// );

// root.render(
//   <Provider store={store}>
//     <Router>
//       <App />
//     </Router>
//   </Provider>
// );
