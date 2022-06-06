import { useState } from "react";
import { useForm } from "react-hook-form";
import createPost from "../../../helpers/createPost";
import { Modal, Button } from "../../../components";
import { Navigate } from "react-router-dom";

import styles from "./styles.module.css";

const PostForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    const response = await createPost(data);
    if (response) {
      setShowModal(true);
      reset();
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.maintitle}>Create new post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            {...register("title", {
              required: true,
            })}
          />
          {errors.title && errors.title.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.title && <span role="alert">{errors.title.message}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            rows={10}
            {...register("content", { required: true })}
          />
          {errors.content && errors.content.type === "required" && (
            <span>This is required</span>
          )}
        </div>
        <Button content={"Submit"}/>
      </form>
      <Modal
        title={"Post has been created successfuly"}
        button={"Close"}
        buttonAction={() => setRedirect(true)}
        active={showModal}
      >
        <p>
          Congrats! Your post has bees created successfuly.
          <br /> Now return to home page.
        </p>
      </Modal>
      {redirect && <Navigate to="/" />}
    </div>
  );
};
export default PostForm;
