import { useState } from "react";
import { useForm } from "react-hook-form";
import createUser from "../../../helpers/createUser";
import { Modal, Button } from "../../../components";
import { Navigate } from "react-router-dom";

import styles from "./styles.module.css";

const NewUser = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const userPermissions = [
    { label: "Can edit posts", value: "canEditPosts" },
    { label: "Can create/delete posts", value: "canCreatePosts" },
    { label: "Can delete comments", value: "canDeleteComments" },
  ];

  const onSubmit = async (data: any) => {
    const response = await createUser(data);
    if (response.ok) {
      setShowModal(true);
      reset();
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.maintitle}>Create new user</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && errors.name.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.name && <span role="alert">{errors.name.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastname">Lastname</label>
          <input
            id="lastname"
            {...register("lastname", {
              required: true,
            })}
          />
          {errors.lastname && errors.lastname.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.lastname && (
            <span role="alert">{errors.lastname.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            {...register("email", {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <span>This is required</span>
          )}
          {errors.email && <span role="alert">{errors.email.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            {...register("password", {
              required: true,
            })}
            type={"password"}
          />
          {errors.password && errors.password.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.password && (
            <span role="alert">{errors.password.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="canEdit">User permissions</label>
          <select {...register("permissions")}>
            {userPermissions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.canEdit && errors.canEdit.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.canEdit && <span role="alert">{errors.canEdit.message}</span>}
        </div>
        <Button content={"Submit"} />
      </form>
      <Modal
        title={"User has been created successfuly"}
        button={"Close"}
        buttonAction={() => setRedirect(true)}
        active={showModal}
      >
        <p>
          Congrats! You have created a new user. Now he can login and use the
          app.
          <br /> Return to home page.
        </p>
      </Modal>
      {redirect && <Navigate to="/users" />}
      {user.role !== "admin" && <Navigate to={`/`} />}
    </div>
  );
};
export default NewUser;
