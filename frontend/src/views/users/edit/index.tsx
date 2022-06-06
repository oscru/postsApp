import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import UpdateUserForm from "../../../fragments/users/update";

import styles from "./styles.module.css";

const EditUser = () => {
  const logedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const { id } = useParams();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch(`/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h1>Update user</h1>
      {user && <UpdateUserForm data={user} id={user.userId} />}
      {logedUser.role !== "admin" && <Navigate to={`/`} />}
    </div>
  );
};
export default EditUser;
