import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';

export const App = () => (
  <main className="section">
    <div className="container">
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <div className="tile is-child box is-success">
            <div className="block">
              <UserSelector />
            </div>

            <div className="block" data-cy="MainContent">
              <PostsList />
            </div>
          </div>
        </div>

        <PostDetails />
      </div>
    </div>
  </main>
);
