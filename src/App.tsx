import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { Users } from './features/users/users';
import { PostsList } from './features/posts/posts';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { PostDetails } from './features/comments/comments';
import { Loader } from './components/Loader';
import { Counter } from './features/counter/Counter';
import * as postsActions from './features/posts/postsSlice';
// eslint-disable-next-line max-len
import * as selectedPostActions from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const { author } = useAppSelector((state) => state.author);
  const { items, loaded, hasError } = useAppSelector((state) => state.posts);
  const { selectedPost } = useAppSelector((state) => state.selectedPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(selectedPostActions.selectPost(null));

    if (author) {
      dispatch(postsActions.getPostsOfUser(author.id));
    } else {
      dispatch(postsActions.clearPosts());
    }
  }, [author?.id]);

  return (
    <main className="section">
      <Counter />

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <Users />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !loaded && <Loader />}

                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && items.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && items.length > 0 && (
                  <PostsList />
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
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
