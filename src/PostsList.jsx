import React from 'react';
import { connect } from 'react-redux'
import { loadPosts, loadUsers, loadComments } from './API_DATA';
import Post from './Post'
import './App.css'


const getData = (state) => ({
  filterPosts: state.filterPosts,
  isLoading: state.isLoading,
})

const getMethods = (dispatch) => ({
  loading: () => dispatch({
    type: 'LOADING',
    isLoading: true,
  }),

  setData: (data) => dispatch({
    type: 'SET_DATA',
    value: data,
    isLoading: false,
    isLoaded: true,
   }),

  handleChangeFilter: (value) => dispatch({
    type: 'FILTER_POSTS',
    value: value,
  }),
})

class  TodosList extends React.Component {

  loadData = async() => {
    this.props.loading()

    const users = await loadUsers();
    const posts = await loadPosts();
    const comments = await loadComments();

    const postsWithCommentsAndUsers = posts.map(post => ({
      ...post,
      comments: comments.filter(comment => post.id === comment.postId),
      user: users.find(user => user.id === post.userId),
    }));

    this.props.setData(postsWithCommentsAndUsers)
  }

  render() {
    const { filterPosts } = this.props

    return (
      <div>
        {filterPosts.length
          ? (<div className="App">
              <div className="search_list">
                <input
                  className="search_field"
                  type="text"
                  onChange={(event) => this.props.handleChangeFilter(event.target.value)}
                  placeholder="Search"
                />
              </div>
              <div>
                {filterPosts.map(post => (
                <div>
                  <Post post={post}/>
                </div>
              ))}
              </div>
            </div>
            ) : (
                  <div className='button_load'>
                    <button
                      onClick={this.loadData}
                      type="button"
                      className="button"
                    >
                     {this.props.isLoading ? 'Loading' : 'Load'}
                    </button>
                    </div>
                )
          }
      </div>
    )
  }
}

export default connect(
  getData,
  getMethods
)(TodosList);
