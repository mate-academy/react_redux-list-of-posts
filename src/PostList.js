import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import CommentsList from './CommentList';

const PostList = ({ filterPost }) => (
  <section className="postList">
    {filterPost.length > 0 ? filterPost.map(item => (
      <div className="post" key={item.id}>
        <Post
          title={item.title}
          body={item.body}
          name={item.user.name}
          email={item.user.email}
          city={item.user.address.city}
          idPost={item.id}
        />
        <hr className="line" />
        <CommentsList comments={item.comments} />
      </div>
    )) : (<h3 className="postList__not-found">Comment not found...</h3>)
    }

  </section>
);

PostList.propTypes = {
  filterPost: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
