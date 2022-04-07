import { useDispatch, useSelector } from "react-redux";
import { isLoading, loadMessage, getPosts, loadPosts } from "../store";

export const Start = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const posts = useSelector(getPosts);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          console.log("click1");
          dispatch(loadPosts());
        }}
      >
        {loading ? "Loading..." : "Load"}
      </button>
      <div>{posts.map((item) => item.id).join(", ")}</div>
    </div>
  );
};
