import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers } from './store/usersSlice';
import { RootState } from './app/store';
import { clearPosts, fetchPosts } from './store/postsSlice';
import {
  clearComments,
  deleteComment,
  fetchComments,
} from './store/commentsSlice';
import { useAppDispatch } from './app/hooks';
import {
  uiActions,
  selectSelectedUserId,
  selectSelectedPostId,
} from './store/uiSlice';

export const App = () => {
  const dispatch = useAppDispatch();

  const users = useSelector((state: RootState) => state.users.items);
  const usersLoading = useSelector((state: RootState) => state.users.loaded);
  const usersError = useSelector((state: RootState) => state.users.hasError);

  const posts = useSelector((state: RootState) => state.posts.items);
  const postsLoading = useSelector((state: RootState) => state.posts.loaded);
  const postsError = useSelector((state: RootState) => state.posts.hasError);

  const comments = useSelector((state: RootState) => state.comments.items);
  const commentsLoading = useSelector(
    (state: RootState) => state.comments.loading,
  );
  const commentsError = useSelector(
    (state: RootState) => state.comments.hasError,
  );

  const selectedUserId = useSelector(selectSelectedUserId);
  const selectedPostId = useSelector(selectSelectedPostId);

  const selectedPost = posts.find(p => p.id === selectedPostId) || null;

  const author = users.find(u => u.id === selectedUserId) || null;

  const handleUserSelect = (id: number | null) =>
    dispatch(uiActions.selectUser(id));
  const handlePostSelect = (id: number | null) =>
    dispatch(uiActions.selectPost(id));

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUserId !== null) {
      dispatch(fetchPosts(selectedUserId));
      dispatch(clearComments());
      dispatch(uiActions.selectPost(null));
    } else {
      dispatch(clearPosts());
      dispatch(clearComments());
      dispatch(uiActions.selectPost(null));
    }
  }, [selectedUserId, dispatch]);

  useEffect(() => {
    if (selectedPostId !== null) {
      dispatch(fetchComments(selectedPostId));
    } else {
      dispatch(clearComments());
    }
  }, [selectedPostId, dispatch]);

  const handleDeleteComment = (id: number) => {
    dispatch(deleteComment(id));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  onSelect={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {usersLoading && <Loader data-cy="Loader" />}
                {usersError && (
                  <div className="notification is-danger">
                    Failed to load users
                  </div>
                )}

                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && postsLoading && <Loader data-cy="Loader" />}
                {author && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author &&
                  !postsLoading &&
                  !postsError &&
                  (posts.length === 0 ? (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ) : (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPostId}
                      onSelectPost={handlePostSelect}
                    />
                  ))}
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
              { 'Sidebar--open': selectedPostId !== null },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                post={selectedPost}
                comments={comments}
                commentsLoading={commentsLoading}
                commentsError={commentsError}
                onDeleteComment={handleDeleteComment}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
