import React, { useCallback, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setAuthor } from './features/authorSlice';
import {
  addSelectedPost,
  clearSelectedPost,
} from './features/selectedPostSlice';
import { getUsers } from './api/users';
import { setUsers } from './features/userSlice';
import { changeAsync, clearPosts } from './features/postsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    posts: statePosts,
    author,
    selectedPost,
  } = useAppSelector(state => ({
    ...state,
    author: state.author.value,
    selectedPost: state.selectedPost.value,
  }));

  const { loaded, hasError, items: posts } = statePosts;

  const setCurrentAuthor = (newAuthor: User) => {
    dispatch(setAuthor(newAuthor));
  };

  const setSelectedPost = (post: Post | null) => {
    dispatch(addSelectedPost(post));
  };

  useEffect(() => {
    getUsers().then(usersFromServer => dispatch(setUsers(usersFromServer)));
  }, [dispatch]);

  const loadUserPosts = useCallback(
    (userId: number) => {
      dispatch(changeAsync(userId));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(clearSelectedPost());

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(clearPosts());
    }
  }, [dispatch, loadUserPosts, author]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={setCurrentAuthor} />
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
                    onPostSelected={setSelectedPost}
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
