export const getPosts = (state: StoragePosts) => state.posts;
export const getError = (state: StoragePosts) => state.isError;
export const getLoading = (state: StoragePosts) => state.isLoading;
export const getQuery = (state: StoragePosts) => state.query;
export const getFilteredQuery = (state: StoragePosts) => state.filterQuery;
