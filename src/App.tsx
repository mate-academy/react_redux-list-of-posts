import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  actions as userActions,
  selectors as userSelectors,
} from './features/users/usersSlice';
import {
  actions as authorActions,
  selectors as authorSelectors,
} from './features/author/authorSlice';
import { selectors as postsSelectors } from './features/posts/postsSlice';
import {
  actions as selectedPostActions,
  selectors as selectedPostSelectors,
} from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  // users added
  const dispatch = useAppDispatch();

  const users = useAppSelector(userSelectors.selectUsers);
  const author = useAppSelector(authorSelectors.selectUser);
  const selectedPost = useAppSelector(selectedPostSelectors.selectPost);
  const {
    hasError,
    loaded,
    items: posts,
  } = useAppSelector(postsSelectors.selectAll);

  useEffect(() => {
    dispatch(userActions.init());
  }, [dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  options={users}
                  value={author}
                  onChange={({ id }) => {
                    dispatch(authorActions.setWithPost(id));
                  }}
                />
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

                {author && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={post =>
                      dispatch(
                        post
                          ? selectedPostActions.set(post.id)
                          : selectedPostActions.remove(),
                      )
                    }
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
