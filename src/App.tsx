import React, { useEffect } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { Loader } from './components/Loader';
import { UserSelector } from './components/UserSelector';
import { setAuthor } from './features/author/authorSlice';
// import { setPosts } from './features/posts/postsSlice';
import classNames from 'classnames';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { postsAsync } from './features/posts/postsSlice';
import { setSelectedPost } from './features/posts/selectedPostSlice';
import { Post } from './types/Post';
import { User } from './types/User';

export const App: React.FC = () => {
  const { author } = useAppSelector(state => state.author);
  const { items, loaded, hasError } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const dispatch = useAppDispatch();

  const handleAuthorChange = (currUser: User) => {
    dispatch(setAuthor(currUser));

    dispatch(setSelectedPost(null));
  };

  const handleSelectedPost = (post: Post | null) => {
    dispatch(setSelectedPost(post));
  };

  useEffect(() => {
    if (author) {
      dispatch(postsAsync(author.id));
    }
  }, [dispatch, author]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={handleAuthorChange} />
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

                {author && loaded && !hasError && items.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && items.length > 0 && (
                  <PostsList
                    posts={items}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={handleSelectedPost}
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
