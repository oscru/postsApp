import { useEffect, useState } from "react";
import { List, Modal } from "../../components";

import styles from "./styles.module.css";

const Posts = () => {
  const [logs, setLogs] = useState<any[]>([]);

  const token = JSON.parse(localStorage.getItem("token") || "{}");

  useEffect(() => {
    fetch(`/posts-logs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          setLogs(data);
        }
      });
  }, []);

  return (
    <main>
      <List
        data={logs}
        title={"Logs"}
        type={"logs"}
        columns={["user", "action", "post", "date"]}
      />
    </main>
  );
};
export default Posts;
