import React from 'react';

import { useDispatch } from 'react-redux';
import { Post } from '../helpers/interfaces';
import { arrayOfSelectUsers } from '../helpers/users';
import { sortByInput } from '../store/inputChange';
import { removePost } from '../store/userPosts';

import './PostsList.scss';

type PostsListProps = {
  handleClick: Function;
  postIsOpened: boolean;
  activePostId: number
  posts: Post[];
};

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  handleClick,
  postIsOpened,
  activePostId,
}) => {
  const dispatch = useDispatch();

  function debounce(f: Function, delay: number) {
    let timer: number;

    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentTarget = event.currentTarget;

      const action = sortByInput(currentTarget.value);
      clearTimeout(timer); 
      timer = window.setTimeout( () => {
        f(action);
      }, delay)
    }
  }
  
  let wrapper = debounce(dispatch, 1500);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <div className="App__input">
        <label className="PostsList__filterByTitle">
          <input
            className="filterByTitle"
            type="text"
            name="filterTitle"
            placeholder="Put the name of post"
            onChange={wrapper}
          />
          <span className="bar" />
        </label>
      </div>
      <div className="App__PostList">
        <ul className="PostsList__list">
          {posts.map(post => (
            <li
              key={post.id}
              className="PostsList__item"
            >
              <div>
                <b>{arrayOfSelectUsers[post.userId]}</b>
                <p className="PostsLists__item_title">
                  {post.title}
                </p>
              </div>
              <div className="PostsList__list_button">
                <button
                  className="PostsList__button"
                  type="button"
                  onClick={() => dispatch(removePost(post.id))}
                >
                  Remove
              </button>
                {postIsOpened && post.id === activePostId
                  ? (
                    <button
                      type="button"
                      className="PostsList__button"
                      onClick={() => handleClick(post.id, 'Close')}
                    >
                      Close
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      className="PostsList__button"
                      onClick={() => handleClick(post.id, 'Open')}
                    >
                      Open
                    </button>
                  )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
