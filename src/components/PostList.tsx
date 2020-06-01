
import React, { ChangeEvent, useEffect } from 'react';
import { getAllData } from '../helpers/api';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { UserType, PostType, CommentType } from '../types';
import { SET_COMMENTS } from '../store/comments';
import { SET_USERS } from '../store/users';
import { SET_POSTS } from '../store/posts';
import { RootState } from '../store';
import { SET_MESSAGE } from '../store/message';
import { Post } from './Post';
import { setFilterFieldCreator } from '../store/filterField';
import { setFilteredPostsCreator } from '../store/filteredPosts';
import { debounce } from '../helpers/debounce';

type PropsType = {
  setMessage: (message: string) => void;
  setUsers: (users: UserType[]) => void;
  setComments: (comments: CommentType[]) => void;
  setPosts: (posts: PostType[]) => void;
  message: string;
  posts: PostType[];
  filterField: string;
  setFilterField: (filterField: string) => void;
  setFilteredPosts: (filteredPosts: PostType[]) => void;
  filteredPosts: PostType[],
}

const PostList = ({
  setMessage,
  setComments,
  setPosts,
  setUsers,
  message,
  posts,
  filterField,
  setFilterField,
  filteredPosts,
  setFilteredPosts,
}: PropsType) => {

  const handleButtonClick = () => {
    setMessage('Is loading');
    getAllData().then(([posts, users, comments]) => {
      setComments(comments);
      setPosts(posts);
      setFilteredPosts(posts)
      setUsers(users);
      setMessage('Loaded')
    })
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterField(event.target.value);
  }

  useEffect(() => {
    debounce(() => {
      if (filterField === "") {
        setFilteredPosts(posts);
      } else {
        setFilteredPosts(posts.filter(
          (post: PostType) => post.body.includes(filterField)
            || post.title.includes(filterField)))
      }
    },
      1000)
  }, [filterField, filteredPosts, setFilteredPosts, posts])

  return (
    <div>
      {message === 'Loaded'
        ? (<>
          <span>For filtering: </span>
          <input
            type="text"
            value={filterField}
            onChange={handleInputChange}
          />
          <ul>
            {filteredPosts.map((post: PostType) => {
              return (
                <li key={post.id}>
                  <Post post={post} />
                </li>
              )
            })}
          </ul>
        </>)
        : <button
          onClick={handleButtonClick}
        >
          {message}
        </button>}
    </div>
  )
}

const mapState = (state: RootState) => ({
  message: state.message,
  posts: state.posts,
  filterField: state.filterField,
  filteredPosts: state.filteredPosts,
})

const mapDispatch = (dispatch: Dispatch) => ({
  setUsers: (users: UserType[]) => dispatch({ type: SET_USERS, users }),
  setComments: (comments: CommentType[]) => dispatch({ type: SET_COMMENTS, comments }),
  setPosts: (posts: PostType[]) => dispatch({ type: SET_POSTS, posts }),
  setMessage: (message: string) => dispatch({ type: SET_MESSAGE, message }),
  setFilterField: (filterField: string) => dispatch(setFilterFieldCreator(filterField)),
  setFilteredPosts: (filteredPosts: PostType[]) => dispatch(setFilteredPostsCreator(filteredPosts))
})

export default connect(mapState, mapDispatch)(PostList)
