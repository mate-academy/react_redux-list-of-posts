import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Post } from '../types/Post';
import type { RootState, AppDispatch } from './store';

// Use these hooks everywhere instead of useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useSelectedPost = <T extends Post | null = Post | null>() => {
  const { selectedPost } = useAppSelector(store => store.selectedPost);

  return selectedPost as T;
};

export const useUsers = () => useAppSelector(state => state.users);
export const usePosts = () => useAppSelector(state => state.posts);
export const useAuthor = () => useAppSelector(state => state.author);
export const useComments = () => useAppSelector(state => state.comments);
