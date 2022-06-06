const getPost = (id: string) => {
  return fetch(`/posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
export default getPost;
