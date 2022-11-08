import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import { store } from './app/store';
import { App } from './App';
// import { UsersProvider } from './components/UsersContext';

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

ReactDOM.render(<Root />, document.getElementById('root'));

// const container = document.getElementById('root');

// // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// const root = createRoot(container!);

// root.render(
//   <Provider store={store}>
//     {/* Remove UsersProvider when you move users to Redux store */}
//     {/* <UsersProvider> */}
//     <Router>
//       <App />
//     </Router>
//     {/* </UsersProvider> */}
//   </Provider>,
// );
