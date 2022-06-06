const createUser = (props: any) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");

  console.log(token);

  return fetch(`/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(props),
  }).then((res) => res);
};

export default createUser;
