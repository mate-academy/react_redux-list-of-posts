import React from 'react';
import PostHandler from './PostHandler';
import '../styles/PostList.css';

export default function PostList(props) {
  const { postsRequested,
          postsData,
          commentsData,
          postSearched,
          searchedPosts,
          buttonClicked,
          inputFilled } = props;
  const createdPosts = [];

  if (!postsRequested){
    return <button onClick={buttonClicked} className="load">Load posts</button>;
  } else {
    if (postsData === null) {
      return <button className="load" disabled>Loading...</button>;
    } else {
      (postSearched ? searchedPosts : postsData).forEach(post => {
        const postsComments = commentsData.filter(comment => comment.postId === post.id);

        createdPosts.push(<PostHandler post={post} postsComments={postsComments} key={post.id} />);
      });

      return (
        <section className="posts-page">
          <input className="search"
                 onChange={(event) => inputFilled(event.target.value)}
                 placeholder="Search..."
          />
          {createdPosts}
        </section>
      );
    }
  }
}
