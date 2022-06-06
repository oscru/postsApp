import createPostProps from "./props";

const createPost = (props: createPostProps) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  return fetch(`/posts/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(props),
  }).then((res) => res.json());
};
export default createPost;
