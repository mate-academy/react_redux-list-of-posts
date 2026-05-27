import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { AppDispatch, RootState } from './app/store';
import { fetchUsers } from './features/users/usersSlice';
import { setAuthor } from './features/author/authorSlice';
import { fetchPostsByAuthor, clearPosts } from './features/posts/postsSlice';
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const author = useSelector((state: RootState) => state.author.value);
  const postsState = useSelector((state: RootState) => state.posts);
  const selectedPost = useSelector(
    (state: RootState) => state.selectedPost.value,
  );

  const isPostsLoading = author && !postsState.loaded;
  const isPostsError = author && postsState.loaded && postsState.hasError;
  const isNoPosts =
    author &&
    postsState.loaded &&
    !postsState.hasError &&
    postsState.items.length === 0;
  const hasPosts =
    author &&
    postsState.loaded &&
    !postsState.hasError &&
    postsState.items.length > 0;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(fetchPostsByAuthor(author.id));
    } else {
      dispatch(clearPosts());
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

                {isPostsLoading && <Loader />}

                {isPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {hasPosts && (
                  <PostsList
                    posts={postsState.items}
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
