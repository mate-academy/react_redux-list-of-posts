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
import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './api/users';
import { setUsers } from './features/users/usersSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setAuthor } from './features/users/authorSlice';
import { setError, setLoaded, setPosts } from './features/posts/postsSlice';
import { setSelectedPost } from './features/posts/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);

  const selectedPost = useAppSelector(state => state.selectedPost);
  const author = useAppSelector(state => state.author);

  useEffect(() => {
    getUsers().then(data => {
      dispatch(setUsers(data));
    });
  }, [dispatch]);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(setLoaded(false));
      dispatch(setError(false));

      getUserPosts(author.id)
        .then(data => dispatch(setPosts(data)))
        .catch(() => dispatch(setError(true)))
        .finally(() => dispatch(setLoaded(true)));
    } else {
      dispatch(setPosts([]));
    }
  }, [author, dispatch]);

  const handleAuthorSelected = (user: User) => {
    dispatch(setAuthor(user));
  };

  const handlePostSelected = (post: Post | null) => {
    dispatch(setSelectedPost(post));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={handleAuthorSelected} />
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
                    onPostSelected={handlePostSelected}
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
