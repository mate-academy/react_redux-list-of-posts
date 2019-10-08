import React from 'react';
import { CommentHandler } from './CommentHandler';

export function CommentList(props) {
  return props.comments.map(item => (
    <CommentHandler
      key={item.id}
      commentAuthorName={item.name}
      body={item.body}
      id={item.id}
    />
  ));
}
