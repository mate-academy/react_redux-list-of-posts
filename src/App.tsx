import React, { useEffect } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { userSlice } from './features/author-slice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { init, postsSlice } from './features/posts-slice';
import { selectedPostSlice } from './features/selectedPost-slice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.value);
  const {
    value: posts,
    isLoading,
    error,
  } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.post.value);

  const handleSetAuthor = (person: User) => {
    dispatch(userSlice.actions.getUser(person));
  };

  const handleSetPost = (currentPost: Post | null) => {
    dispatch(selectedPostSlice.actions.getPost(currentPost));
  };

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    handleSetPost(null);

    if (user) {
      dispatch(init(user.id));
    } else {
      dispatch(postsSlice.actions.clearPosts());
    }
  }, [user]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={user} onChange={handleSetAuthor} />
              </div>

              <div className="block" data-cy="MainContent">
                {!user && <p data-cy="NoSelectedUser">No user selected</p>}

                {user && isLoading && <Loader />}

                {user && !isLoading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {user && !isLoading && !error && posts?.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {user && !isLoading && !error && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={handleSetPost}
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
