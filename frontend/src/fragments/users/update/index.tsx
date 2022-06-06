import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { Modal, Button } from "../../../components";
import updateUser from "../../../helpers/updateUser";

import styles from "./styles.module.css";

const UpdateUserForm = (props: any) => {
  const { data, id } = props;
  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const userPermissions = [
    {
      label: "Can edit posts",
      value: "canEditPosts",
      active: data.canEditPosts,
    },
    {
      label: "Can create/delete posts",
      value: "canCreatePosts",
      active: data.canCreatePosts,
    },
    {
      label: "Can delete comments",
      value: "canDeleteComments",
      active: data.canDeleteComments,
    },
  ];
  const activePermission = userPermissions.find((x) => x.active);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      permissions: activePermission ? activePermission.value : "",
    },
  });

  // console.log(data)
  const onSubmit = async (data: any) => {
    const response = await updateUser({ id, data });
    if (response.ok) {
      setShowModal(true);
      reset();
    }
  };

  return (
    <div className={styles.mainContainer}>
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
          <label htmlFor="permissions">User permissions</label>
          <select {...register("permissions")}>
            {userPermissions.map(({ label, value, active }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.permissions && errors.permissions.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.permissions && (
            <span role="alert">{errors.permissions.message}</span>
          )}
        </div>
        <Button content={"Submit"} />
      </form>
      <Modal
        title={"The user has been updated successfully"}
        button={"Return"}
        buttonAction={() => setRedirect(true)}
        active={showModal}
      >
        <p>Congrats! The user has been updated successfully.</p>
      </Modal>
      {redirect && <Navigate to={"/users"} />}
    </div>
  );
};
export default UpdateUserForm;
