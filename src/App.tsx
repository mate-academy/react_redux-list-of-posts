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
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';
import { loadPosts, setPosts } from './features/posts/postsSlice';

export const App: React.FC = () => {
  const { items, loaded, hasError } = useAppSelector(store => store.posts);
  const { selectedPost } = useAppSelector(store => store.selectedPost);
  const { author } = useAppSelector(store => store.author);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(loadPosts(author.id));
    } else {
      dispatch(setPosts([]));
    }
  }, [author]);

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
                  <PostsList posts={items} selectedPostId={selectedPost?.id} />
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
