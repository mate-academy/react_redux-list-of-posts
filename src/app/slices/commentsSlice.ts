import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

const initialState = {
    items: [] as Comment[],
    loaded: false,
    hasError: false,
};

export const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments: (state, action) => ({
            ...state,
            items: action.payload,
        }),
        setLoaded: (state, action) => ({
            ...state,
            loaded: action.payload,
        }),
        setError: (state, action) => ({
            ...state,
            hasError: action.payload,
        }),
    },
});

export const { setComments, setLoaded, setError } = commentSlice.actions;
export const commentsReducer = commentSlice.reducer;
