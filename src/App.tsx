import React, { useEffect } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { getUsers } from './api/users';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setAuthor } from './features/author';
import { setUsers } from './features/users';
import { setSelectedPost } from './features/selectedPost';
import {
  setPosts,
  setLoaded as setPostsLoaded,
  setError as setPostsError,
} from './features/posts';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);

  const {
    items: posts,
    loaded: postsLoaded,
    hasError: postsError,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    getUsers().then(users => {
      dispatch(setUsers(users));
    });
  }, []);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(setPostsLoaded(false));
      dispatch(setPostsError(false));

      getUserPosts(author.id)
        .then(fetchedPosts => {
          dispatch(setPosts(fetchedPosts));
        })
        .catch(() => {
          dispatch(setPostsError(true));
        })
        .finally(() => {
          dispatch(setPostsLoaded(true));
        });
    } else {
      dispatch(setPosts([]));
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

                {author && !postsLoaded && <Loader />}

                {author && postsLoaded && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && postsLoaded && !postsError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && postsLoaded && !postsError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={post => dispatch(setSelectedPost(post))}
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
