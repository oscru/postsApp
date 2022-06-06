import classNames from "classnames";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getPost from "../../../helpers/getPost";
import { useForm } from "react-hook-form";
import createComment from "../../../helpers/createComment";
import deleteComment from "../../../helpers/deleteComment";
import { Button, Modal } from "../../../components";
import { DateTime } from "luxon";

import styles from "./styles.module.css";

const Read = () => {
  const [post, setPost] = useState({ title: "", content: "" });
  const [comments, setComments] = useState<any[]>([]);
  const [author, setAuthor] = useState({ name: "" });
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    const response = await createComment({ ...data, postId: id });
    if (response) {
      //TODO: add comment to state
      // setComments([comments, response]);
      window.location.reload();
      reset();
    }
  };

  const handleDeleteComment = async (id: number) => {
    await deleteComment({ id }).then((res) => {
      if (res && res.status === 200) {
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    if (id) {
      getPost(id).then((data) => {
        setPost(data.post);
        setComments(data.commentsWAuthor);
        setAuthor(data.author);
      });
    }
  }, []);

  return (
    <div className={styles.mainContainer}>
      {post && post.title && <h1>{post.title}</h1>}
      <div>{post && post.content && <p>{post.content}</p>}</div>
      <div className={styles.commentsContainer}>
        <h2>Comments</h2>
        {comments && (
          <ul>
            {comments.map((comment: any) => {
              const commentId = comment.dataValues.id;
              return (
                <li
                  key={commentId}
                  className={classNames(
                    comment.dataValues.commentId && styles.reply,
                    styles.comment
                  )}
                >
                  <p>
                    <span className={styles.author}>
                      {comment.author.name} {comment.author.lastname}
                    </span>{" "}
                    <span className="text-xs">
                      {DateTime.fromISO(comment.dataValues.createdAt).toFormat(
                        "dd/LL/yyyy"
                      )}{" "}
                    </span>
                    {(user.role === "admin" || user.canDeleteComments) && (
                      <button
                        onClick={() =>
                          handleDeleteComment(comment.dataValues.id)
                        }
                      >
                        Delete
                      </button>
                    )}
                    <br /> {comment.dataValues.comment}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.commentsForm}>
          <div className={styles.formGroup}>
            <textarea
              id="comment"
              rows={5}
              placeholder={"White a new comment..."}
              {...register("comment", { required: true })}
            />
            {errors.comment && errors.comment.type === "required" && (
              <span>This is required</span>
            )}
          </div>
          <Button content={"Submit"} />
        </form>
      </div>
    </div>
  );
};

export default Read;
