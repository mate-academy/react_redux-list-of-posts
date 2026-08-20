import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './app/hooks';

import {
  loadUserPosts,
  selectPosts,
  selectPostsError,
  selectPostsLoaded,
} from './features/posts/postsSlice';

import {
  selectSelectedPost,
  setSelectedPost,
} from './features/selectedPost/selectedPostSlice';

import {
  loadUsers,
  selectAuthor,
  selectUsersError,
  selectUsersLoaded,
} from './features/users/usersSlice';

import { loadPostComments } from './features/comments/commentsSlice';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(selectAuthor);

  const posts = useAppSelector(selectPosts);
  const postsLoaded = useAppSelector(selectPostsLoaded);
  const postsError = useAppSelector(selectPostsError);

  const selectedPost = useAppSelector(selectSelectedPost);

  const usersLoaded = useAppSelector(selectUsersLoaded);
  const usersError = useAppSelector(selectUsersError);

  useEffect(() => {
    if (!usersLoaded && !usersError) {
      dispatch(loadUsers());
    }
  }, [dispatch, usersLoaded, usersError]);

  useEffect(() => {
    if (author) {
      dispatch(loadUserPosts(author.id));
      dispatch(setSelectedPost(null));
    }
  }, [dispatch, author]);

  useEffect(() => {
    if (selectedPost !== null) {
      dispatch(loadPostComments(selectedPost));
    }
  }, [dispatch, selectedPost]);

  const handlePostSelected = (postId: number) => {
    if (selectedPost === postId) {
      dispatch(setSelectedPost(null));
    } else {
      dispatch(setSelectedPost(postId));
    }
  };

  const selectedPostData =
    selectedPost !== null
      ? posts.find(post => post.id === selectedPost)
      : undefined;

  return (
    <div>
      <header className="section pb-0">
        <div className="container">
          <UserSelector />
        </div>
      </header>

      <main className="section" data-cy="MainContent">
        <div className="container">
          {!usersLoaded && !usersError && <Loader />}

          {usersError && (
            <div className="notification is-danger">
              Something went wrong while loading users.
            </div>
          )}

          {!author && usersLoaded && (
            <div className="notification is-info" data-cy="NoSelectedUser">
              No user selected
            </div>
          )}

          {author && (
            <>
              {!postsLoaded && !postsError && <Loader />}

              {postsError && (
                <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  Something went wrong while loading posts.
                </div>
              )}

              {postsLoaded && !postsError && posts.length === 0 && (
                <div className="notification is-info" data-cy="NoPostsYet">
                  No posts yet
                </div>
              )}

              {postsLoaded && !postsError && posts.length > 0 && (
                <PostsList
                  posts={posts}
                  selectedPostId={selectedPost ?? undefined}
                  onPostSelected={post => {
                    if (post === null) {
                      dispatch(setSelectedPost(null));
                    } else {
                      handlePostSelected(post.id);
                    }
                  }}
                />
              )}
            </>
          )}
        </div>
      </main>

      <aside
        data-cy="Sidebar"
        className={`Sidebar${selectedPost !== null ? ' Sidebar--open' : ''}`}
      >
        {selectedPostData && <PostDetails post={selectedPostData} />}
      </aside>
    </div>
  );
};
