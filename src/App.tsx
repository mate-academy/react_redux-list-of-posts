import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import type { RootState, AppDispatch } from './app/store';
import { User } from '../src/types/User';
import { fetchPostsByUser, clearPosts } from './features/postsSlice';
import { setSelectedPost } from './features/selectedPostSlice';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';
import { fetchUsers } from './features/usersSlice';
import { setAuthor } from './features/authorSlice';
import { useEffect, useState } from 'react';
import { UserSelector } from './components/UserSelector';
export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authorId = useSelector(
    (state: RootState) => state.author.selectedAuthorId,
  );
  const users = useSelector((state: RootState) => state.users.items);

  const posts = useSelector((state: RootState) => state.posts.items);
  const postsLoaded = useSelector((state: RootState) => state.posts.loaded);
  const postsHasError = useSelector((state: RootState) => state.posts.hasError);

  const selectedPostId = useSelector(
    (state: RootState) => state.selectedPost.selectedPostId,
  );
  const [expanded, setExpanded] = useState(false);
  const author =
    authorId !== null ? (users.find(u => u.id === authorId) ?? null) : null;
  const selectedPost =
    selectedPostId !== null
      ? (posts.find(p => p.id === selectedPostId) ?? null)
      : null;
  const handleAuthorChange = (u: User | null) => {
    dispatch(setAuthor(u ? u.id : null));
  };

  const handlePostSelected = useCallback(
    (id: number | null) => {
      dispatch(setSelectedPost(id));
    },
    [dispatch],
  );
  const usersLoaded = useSelector((s: RootState) => s.users.loaded);

  useEffect(() => {
    if (!usersLoaded) {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersLoaded]);
  // load posts when authorId changes
  useEffect(() => {
    dispatch(setSelectedPost(null));
    if (authorId !== null) {
      dispatch(fetchPostsByUser(authorId));
    } else {
      dispatch(clearPosts());
    }
  }, [authorId, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  value={author}
                  onChange={handleAuthorChange}
                  expanded={expanded}
                  setExpanded={setExpanded}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}
                {author && !postsLoaded && <Loader />}
                {author && postsLoaded && postsHasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {postsLoaded && !postsHasError && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId ?? null}
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
