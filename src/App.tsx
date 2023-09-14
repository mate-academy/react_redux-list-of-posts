import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  clear as clearSelectedPost,
  set as setSelectedPost,
} from './features/selectedPost';
import { clear as clearPosts, init as setUserPosts } from './features/posts';
import { init as setUsers } from './features/users';
import { Post } from './types/Post';
import { User } from './types/User';
import { set as setAuthor } from './features/author';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { posts, loading, error } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { author } = useAppSelector(state => state.author);

  const handleSelectUser = (selectedUser: User) => {
    dispatch(setAuthor(selectedUser));
  };

  const handleSelectPost = (post: Post | null) => {
    if (!post) {
      dispatch(clearSelectedPost());
    } else {
      dispatch(setSelectedPost(post));
    }
  };

  useEffect(() => {
    dispatch(setUsers());
    dispatch(clearSelectedPost());

    if (author) {
      dispatch(setUserPosts(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={author}
                  onChange={handleSelectUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && loading && (
                  <Loader />
                )}

                {author && !loading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loading && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loading && !error && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={handleSelectPost}
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
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
