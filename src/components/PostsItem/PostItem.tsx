import React from 'react';

import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types/RootState';
import { Post } from '../../types/Post';

import './PostItem.scss';
import { showPostInfoAction } from '../../store/postsReducer';

type Props = {
  post: Post,
};

export const PostItem:React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch();
  const users = useSelector((state:RootState) => state.usersReducer.users);
  const user = users.find(u => u.id === post.userId);

  const selectedPost = useSelector((state:RootState) => state.postsReducer.selectedPost);

  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src="https://iconape.com/wp-content/files/nb/368023/svg/person-logo-icon-png-svg.png" alt="Person" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{user?.name || `user #${post.userId}`}</p>
            {user && <p className="subtitle is-6">{user.username}</p>}
          </div>
        </div>

        <div className="content">
          {post.title}
        </div>
      </div>
      {selectedPost === post.id ? (
        <button
          type="button"
          className="button open-post-info is-link"
          onClick={() => dispatch(showPostInfoAction(-1))}
        >
          Close
        </button>
      ) : (
        <button
          type="button"
          className="button open-post-info"
          onClick={() => dispatch(showPostInfoAction(post.id))}
        >
          Open
        </button>
      )}
    </div>
  );
};
