import React from 'react';
import User from './User';
import CommentList from './CommentList';

function Post(props) {
  return (
    <React.Fragment>
      <article>
        <div className="removeArticle" onClick={() => props.removeArticle(props.articles, props.index)}>x</div>
        <div className="article">
          <h2>{props.title}</h2>
          <User author={props.author} />
          <p>{props.text}</p>
        </div>
        <CommentList comments={props.comments} postIndex={props.index}/>
      </article>
    </React.Fragment>

  );
}

export default Post;
