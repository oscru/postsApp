import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { Modal, Button } from "../../../components";
import updatePost from "../../../helpers/updatePost";

import styles from "./styles.module.css";
const UpdatePost = (props: any) => {
  const { data, id } = props;
  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: data.title,
      content: data.content,
    },
  });

  const onSubmit = async (data: any) => {
    const response = await updatePost({ data, id });
    if (response.ok) {
      setShowModal(true);
      reset();
    }
  };
  return (
    <div>
      {" "}
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
        <Button content={"Submit"} />
      </form>
      <Modal
        title={"The post has been updated successfully"}
        button={"Return"}
        buttonAction={() => setRedirect(true)}
        active={showModal}
      >
        <p>Congrats! The post has been updated successfully.</p>
      </Modal>
      {redirect && <Navigate to={"/"} />}
    </div>
  );
};
export default UpdatePost;
