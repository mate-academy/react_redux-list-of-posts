# React + Redux list of posts

##  Technologies
- React
- TypeScript
- Redux Toolkit
- React Redux
- Bulma
- Vite

## Implemented features
- Users list stored in Redux (`users` slice)
- Posts loading by selected user (`posts` slice)
- Post selection stored in Redux (`selectedPost`)
- Comments loading and deletion via Redux (`comments` slice)
- Loading and error states handled in Redux
- Local state preserved only where required (NewCommentForm)

##  State management
Redux store contains the following slices:
- `users`
- `posts`
- `selectedPost`
- `comments`

Async logic is implemented using `createAsyncThunk`.

- [DEMO LINK](https://Nazarii84.github.io/react_redux-list-of-posts/).
