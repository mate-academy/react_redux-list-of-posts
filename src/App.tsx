/* eslint-disable max-len */
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
import * as postsActions from './features/posts/postsSlice';
import * as selectedPostActions from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);

  // const [author, setAuthor] = useState<User | null>(null);

  const dispatch = useAppDispatch();

  const { posts, loading, error } = useAppSelector(state => state.posts);
  const { author } = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectPost.selectedPost);

  function loadUserPosts(userId: number) {
    dispatch(postsActions.loadPosts(userId));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(selectedPostActions.selectPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.clearPosts());
    }
  }, [author]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {loading && <Loader />}

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
                  <PostsList posts={posts} selectedPostId={selectedPost?.id} />
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
