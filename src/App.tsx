import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { useAppDispatch, useAppSelector } from './store/hooks/hooks';
import { fetchUsers } from './store/actionCreators/users';
import { setAuthor } from './store/reducers/AuthorSlice';
import { fetchPosts } from './store/actionCreators/posts';
import { clearPosts } from './store/reducers/PostsSlice';
import { clearPost, setPost } from './store/reducers/SelectedPostSlice';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const { users } = useAppSelector(state => state.users);
  const { author } = useAppSelector(state => state.author);
  const { posts, isLoading, error } = useAppSelector(state => state.posts);
  const { post: selectedPost } = useAppSelector(state => state.post);

  const handleSetAuthor = (user: User | null) => {
    dispatch(setAuthor(user));
  };

  const handleSetSelectedPost = (post: Post | null) => {
    dispatch(setPost(post));
  };

  useEffect(() => {
    dispatch(clearPost());

    if (author) {
      dispatch(fetchPosts(author.id));
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
                  onChange={handleSetAuthor}
                  users={users}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && isLoading && <Loader />}

                {author && !isLoading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !isLoading && !error && posts?.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !isLoading && !error && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={handleSetSelectedPost}
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
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
