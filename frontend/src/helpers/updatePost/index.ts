const updatePost = (props: any) => {
  const { id, data } = props;
  const token = JSON.parse(localStorage.getItem("token") || "{}");

  return fetch(`/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
export default updatePost;
