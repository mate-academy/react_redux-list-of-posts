import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { RootState, AppDispatch } from './app/store';
import { setSelectedPost } from './features/selectedPost';
import { fetchUserPosts } from './features/posts';
import { setAuthor } from './features/author';
import { fetchUsers } from './features/users';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedPost = useSelector(
    (state: RootState) => state.selectedPost.selectedPost,
  );
  const author = useSelector((state: RootState) => state.author.author);
  const posts = useSelector((state: RootState) => state.posts.items);
  const loaded = useSelector((state: RootState) => state.posts.loaded);
  const hasError = useSelector((state: RootState) => state.posts.hasError);
  const users = useSelector((state: RootState) => state.users.items);

  useEffect(() => {
    dispatch(setSelectedPost(null));
    dispatch(fetchUsers());

    if (author) {
      dispatch(fetchUserPosts(author.id));
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={user => dispatch(setAuthor(user))}
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
                        setSelectedPost(
                          post.id === selectedPost?.id ? null : post,
                        ),
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
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
