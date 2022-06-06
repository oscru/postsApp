const updateUser = (props: any) => {
  const { id, data } = props;

  const token = JSON.parse(localStorage.getItem("token") || "{}");

  return fetch(`/users/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
export default updateUser;
