// import React, { useEffect, useState } from 'react';
// import classNames from 'classnames';

// import 'bulma/css/bulma.css';
// import '@fortawesome/fontawesome-free/css/all.css';
// import './App.scss';

// import { PostsList } from './components/PostsList';
// import { PostDetails } from './components/PostDetails';
// import { UserSelector } from './components/UserSelector';
// import { Loader } from './components/Loader';
// import { getUserPosts } from './api/posts';
// import { User } from './types/User';
// import { Post } from './types/Post';

// export const App: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loaded, setLoaded] = useState(false);
//   const [hasError, setError] = useState(false);

//   const [author, setAuthor] = useState<User | null>(null);
//   const [selectedPost, setSelectedPost] = useState<Post | null>(null);

//   function loadUserPosts(userId: number) {
//     setLoaded(false);

//     getUserPosts(userId)
//       .then(setPosts)
//       .catch(() => setError(true))
//       // We disable the spinner in any case
//       .finally(() => setLoaded(true));
//   }

//   useEffect(() => {
//     // we clear the post when an author is changed
//     // not to confuse the user
//     setSelectedPost(null);

//     if (author) {
//       loadUserPosts(author.id);
//     } else {
//       setPosts([]);
//     }
//   }, [author]);

//   return (
//     <main className="section">
//       <div className="container">
//         <div className="tile is-ancestor">
//           <div className="tile is-parent">
//             <div className="tile is-child box is-success">
//               <div className="block">
//                 <UserSelector value={author} onChange={setAuthor} />
//               </div>

//               <div className="block" data-cy="MainContent">
//                 {!author && <p data-cy="NoSelectedUser">No user selected</p>}

//                 {author && !loaded && <Loader />}

//                 {author && loaded && hasError && (
//                   <div
//                     className="notification is-danger"
//                     data-cy="PostsLoadingError"
//                   >
//                     Something went wrong!
//                   </div>
//                 )}

//                 {author && loaded && !hasError && posts.length === 0 && (
//                   <div className="notification is-warning" data-cy="NoPostsYet">
//                     No posts yet
//                   </div>
//                 )}

//                 {author && loaded && !hasError && posts.length > 0 && (
//                   <PostsList
//                     posts={posts}
//                     selectedPostId={selectedPost?.id}
//                     onPostSelected={setSelectedPost}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>

//           <div
//             data-cy="Sidebar"
//             className={classNames(
//               'tile',
//               'is-parent',
//               'is-8-desktop',
//               'Sidebar',
//               {
//                 'Sidebar--open': selectedPost,
//               },
//             )}
//           >
//             <div className="tile is-child box is-success ">
//               {selectedPost && <PostDetails post={selectedPost} />}
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { User } from './types/User';
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';
import { setAuthor } from './features/author/authorSlice';
import { Post } from './types/Post';
import { fetchPosts } from './features/posts/postsSlice';
import { clearPosts } from './features/posts/postsSlice';

interface RootState {
  selectedPost: Post | null;
  posts: {
    items: Post[];
    loaded: boolean;
    hasError: boolean;
  };
  author: User | null;
}

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentPost = useAppSelector(state => state.selectedPost);
  const { items:posts, loaded, hasError } = useAppSelector(state => state.posts);
  const author = useAppSelector(state => state.author);
  const handleAuthorChange = (newAuthor: User | null) => {
    dispatch(setAuthor(newAuthor))
    dispatch(setSelectedPost(null));
  }
  const handlePostSelect = (post: Post | null) => {
    dispatch(setSelectedPost(post));
  };

  useEffect(() => {
    dispatch(setSelectedPost(null));
    // dispatch(setAuthor(null));
    if (author) {
      dispatch(fetchPosts(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author]);

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

                {author && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={currentPost?.id}
                    onPostSelected={handlePostSelect}
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
                'Sidebar--open': currentPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {currentPost && <PostDetails post={currentPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

