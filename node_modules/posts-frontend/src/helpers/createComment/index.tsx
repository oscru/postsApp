const createCommnet = (props: any) => {
  const userId = JSON.parse(localStorage.getItem("user") || "{}").userId;

  return fetch(`/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...props, userId }),
  })
    .then((res) => res.json())
    .then((data) => data);
};
export default createCommnet;
