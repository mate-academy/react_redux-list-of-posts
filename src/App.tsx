import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { getUsers } from './api/users';
import { setUsers } from './redux/usersSlice';
import { setAuthor } from './redux/authorSlice';

import { setLoading, setError, setPosts } from './redux/postSlice';
import { setNull, setPost } from './redux/selectedPostSlice';

export const App: React.FC = () => {
  const selectedPost = useAppSelector(state => state.selectedPost.post);
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);
  const author = useAppSelector(state => state.author.currentAuthor);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUsers().then(usersData => dispatch(setUsers(usersData)));
  }, [dispatch]);

  const loadUserPosts = useCallback(
    (userId: number) => {
      dispatch(setLoading());

      getUserPosts(userId)
        .then(postData => {
          dispatch(setPosts(postData));
        })
        .catch(() => dispatch(setError()));
    },
    [dispatch],
  );

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setNull());

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(setPosts([]));
    }
  }, [author, dispatch, loadUserPosts]);

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
                    onPostSelected={post => dispatch(setPost(post))}
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
