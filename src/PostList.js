import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({ filteredPost }) => (
  <section className="postList">
    {console.log(filteredPost)}
    {filteredPost.length ? filteredPost.map(item => (
      <>
        <Post
          title={item.title}
          body={item.body}
          name={item.user.name}
          email={item.user.email}
          city={item.user.address.city}
          idPost={item.id}
          comments={item.comments}
        />
      </>
    )) : (<h3 className="postList__not-found">Post not found...</h3>)
    }

  </section>
);

PostList.propTypes = {
  filteredPost: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
