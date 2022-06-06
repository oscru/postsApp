const deleteComment = (props: any) => {
  const { id } = props;

  console.log(props);

  const token = JSON.parse(localStorage.getItem("token") || "{}");
  return fetch(`/comments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
export default deleteComment;
