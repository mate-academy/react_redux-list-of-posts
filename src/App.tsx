import React, { useEffect, useState } from 'react';

// We can move CSS imports to index.tsx
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { clientAPI } from './app/clientApi';

export const App: React.FC = () => {
  const [author, setAuthor] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const {
    data: posts = [],
    isLoading,
    isError,
  } = clientAPI.useFetchAllPostsQuery(author?.id);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
  }, [author?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={setAuthor} />
              </div>

              <div className="block">
                {!author && (
                  <p>No user selected</p>
                )}

                {author && isLoading && (
                  <Loader />
                )}

                {author && isLoading && isError && (
                  <div className="notification is-danger">
                    Something went wrong!
                  </div>
                )}

                {
                // eslint-disable-next-line max-len
                  author && isLoading && !isError && posts && posts.length === 0 && (
                    <div className="notification is-warning">
                      No posts yet
                    </div>
                  )
                }

                {
                // eslint-disable-next-line max-len
                  author && !isLoading && !isError && posts && posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPost?.id}
                      onPostSelected={setSelectedPost}
                    />
                  )
                }
              </div>
            </div>
          </div>

          <div className="tile is-parent is-8-desktop">
            <div className="tile is-child box is-success ">
              {selectedPost ? (
                <PostDetails post={selectedPost} />
              ) : (
                <p>Choose a post</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
