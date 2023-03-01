import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { useAppSelector } from './app/hooks';
import { selectAuthor } from './features/author/authorSlice';
// import { getPostsById, selectPosts } from './features/posts/postsSlice';
import {
  selectPost,
} from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const selectedAuthor = useAppSelector(selectAuthor);
  const post = useAppSelector(selectPost);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedAuthor
                  ? (
                    <p data-cy="NoSelectedUser">
                      No user selected
                    </p>
                  )
                  : (
                    <PostsList
                      selectedAuthor={selectedAuthor}
                      selectedPostId={post?.id}
                    />
                  )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': post,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && (
                <PostDetails post={post} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
