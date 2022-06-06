import styles from "./styles.module.css";
import ListProps from "./props";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import Button from "../button";

import classNames from "classnames";

const List = (props: any) => {
  const { data, title, type, columns, onDelete, onEdit, onCreate } = props;

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const dateDiff = (date: string) => {
    return DateTime.fromISO(date).toRelative();
  };

  return (
    <div className={styles.mainListContainer}>
      <div className={styles.headerContainer}>
        <h1 className={styles.listTitle}>{title}</h1>
        {onCreate && (user.role === "admin" || user.canCreatePosts) && (
          <Button
            content="Create new +"
            action={() => {
              onCreate();
            }}
          />
        )}
      </div>
      <div>
        <ul>
          <li>
            <ul
              className={classNames(
                styles.listHeaders,
                columns && `grid-cols-${columns.length}`
              )}
            >
              {columns.map((column: any) => (
                <li key={column}>{column}</li>
              ))}
            </ul>
          </li>
          {data &&
            data.length > 0 &&
            data.map((item: any) => {
              switch (type) {
                case "posts":
                  return (
                    <li
                      key={item?.id}
                      className={classNames(
                        styles.listItem,
                        columns && `grid-cols-${columns.length}`
                      )}
                    >
                      <h2>
                        <Link to={`/posts/read/${item.id}`}>{item?.title}</Link>
                      </h2>
                      <span>{dateDiff(item.createdAt)}</span>
                      <div className={styles.buttonsContainer}>
                        {(user.role === "admin" || user.canCreatePosts) && (
                          <button onClick={() => onDelete(item?.id)}>
                            Delete
                          </button>
                        )}
                        {(user.role === "admin" || user.canEditPosts) && (
                          <button onClick={() => onEdit(item?.id)}>Edit</button>
                        )}
                      </div>
                    </li>
                  );
                case "users":
                  return (
                    <li
                      key={item?.name}
                      className={classNames(
                        styles.listItem,
                        columns && `grid-cols-${columns.length}`
                      )}
                    >
                      <span>
                        {item?.name} {item?.lastname}
                      </span>
                      <span>{item?.email}</span>
                      <span>{item.canEditPosts ? "Yes" : "No"}</span>
                      <span>{item.canDeleteComments ? "Yes" : "No"}</span>
                      <div className={styles.buttonsContainer}>
                        <button onClick={() => onDelete(item?.userId)}>
                          Delete
                        </button>
                        <button onClick={() => onEdit(item?.userId)}>
                          Edit
                        </button>
                      </div>
                    </li>
                  );
                case "logs":
                  return (
                    <li
                      key={item?.id}
                      className={classNames(
                        styles.listItem,
                        columns && `grid-cols-${columns.length}`
                      )}
                    >
                      <span>{item.userId}</span>
                      <span>{item?.action}</span>
                      <span>{item?.postId}</span>
                      {/* DateTime.fromISO(date).toRelative(); */}
                      <span>
                        {DateTime.fromISO(item.createdAt).toFormat(
                          "dd LLL yyyy"
                        )}
                      </span>
                    </li>
                  );
                default:
                  return "";
              }
            })}
        </ul>
      </div>
    </div>
  );
};
export default List;
