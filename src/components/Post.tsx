import React from 'react';
import { PostType } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store'
import { User } from './User';
import { Comments } from './Comments';

type PropsType = {
  id:number
}

export const Post: React.FC<PropsType> = ({ id }:{id: number}) => {
  const {title, body, userId} = useSelector(
    (state:RootState) => state
    .filteredPosts
    .filter((post:PostType) => post.id === id)[0])

  return (
    <div className="Post">
      <h1>{title}</h1>
      <p>{body}</p>
      <User  id={userId}/>
      <Comments postId={id}  />
    </div>
  )
}
