import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import getPost from "../../../helpers/getPost";
import UpdatePost from "../../../fragments/posts/update";

import styles from "./styles.module.css";

const EditPost = () => {
  const [post, setPost] = useState<any>(null);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getPost(id).then((data) => {
        setPost(data.post);
      });
    }
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h1>Edit post</h1>
      {post && <UpdatePost data={post} id={id} />}
    </div>
  );
};
export default EditPost;
