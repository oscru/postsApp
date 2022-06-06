import { useEffect, useState } from "react";
import { List, Modal } from "../../../components";
import { Navigate } from "react-router-dom";

import styles from "./styles.module.css";

const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [editPost, setEditPost] = useState<any>();
  const [deletePostModal, setDeletePostModal] = useState<any>();
  const [selectedPost, setSelectedPost] = useState<number>();
  const [createNewPost, setCreateNewPost] = useState<boolean>();

  const token = JSON.parse(localStorage.getItem("token") || "{}");  

  useEffect(() => {
    fetch(`/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          setPosts(data.posts);
        }
      });
  }, []);

  const onDelete = (id: number) => {
    fetch(`/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        setDeletePostModal(false);
        setPosts(posts.filter((post) => post.id !== id));
      }
    });
  };

  return (
    <main>
      <List
        data={posts}
        title={"List of all Posts"}
        type={"posts"}
        columns={["title", "writed", "actions"]}
        onDelete={(id: number) => {
          setSelectedPost(id);
          setDeletePostModal(true);
        }}
        onEdit={(id: number) => setEditPost(id)}
        onCreate={() => setCreateNewPost(true)}
      />
      {editPost && <Navigate to={`/posts/edit/${editPost}`} />}
      <Modal
        title={"Are you sure you want to delete this post?"}
        button={"Delete"}
        buttonAction={() => (selectedPost ? onDelete(selectedPost) : null)}
        active={deletePostModal}
      >
        <p>
          This post will be deleted permanently. 
          <br /> Are you sure you want to delete this post?
        </p>
      </Modal>
      {createNewPost && <Navigate to={`/posts/create`} />}
    </main>
  );
};
export default Posts;
