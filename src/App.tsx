import classNames from 'classnames';
import React, { useEffect } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { setAuthor } from './app/store/authorSlice';
import { clearPosts, loadUserPosts } from './app/store/postsSlice';
import { setSelectedPost } from './app/store/selectedPostSlice';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Post } from './types/Post';
import { User } from './types/User';

export const App: React.FC = () => {
  const posts = useAppSelector(state => state.posts.items);
  const loaded: boolean = useAppSelector(state => state.posts.loaded);
  const hasError: boolean = useAppSelector(state => state.posts.hasError);
  const author: User | null = useAppSelector(state => state.author.author);
  const selectedPost: Post | null = useAppSelector(state => state.selectedPost.selectedPost);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(loadUserPosts(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [dispatch, author]);

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
