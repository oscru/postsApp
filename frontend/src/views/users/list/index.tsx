import { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext";
import { List, Modal } from "../../../components";

import { Navigate } from "react-router-dom";
const Users = () => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { userData } = useContext(UserContext);
  const [users, setUsers] = useState<any[]>([]);
  const [createNewUser, setCreateNewUser] = useState<boolean>();
  const [editUser, setEditUser] = useState<number>();
  const [deleteUserModal, setDeleteUserModal] = useState<any>();
  const [selectedUser, setSelectedUser] = useState<number>();

  useEffect(() => {
    fetch(`/users`, {
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
          setUsers(data.users);
        }
      });
  }, []);

  const onDelete = (id: number) => {
    fetch(`/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        setDeleteUserModal(false);
        setUsers(users.filter((user) => user.userId !== selectedUser));
      }
    });
  };

  return (
    <main>
      <List
        data={users}
        title={"List of all Users"}
        type={"users"}
        onCreate={() => setCreateNewUser(true)}
        onEdit={(id: number) => setEditUser(id)}
        onDelete={(id: number) => {
          setSelectedUser(id);
          setDeleteUserModal(true);
        }}
        columns={[
          "name",
          "email",
          "can edit",
          "can delete comments",
          "actions",
        ]}
      />
      {createNewUser && <Navigate to="/users/create" />}
      {editUser && <Navigate to={`/users/edit/${editUser}`} />}
      <Modal
        title={"Are you sure you want to delete this user?"}
        button={"Delete"}
        buttonAction={() => (selectedUser ? onDelete(selectedUser) : null)}
        active={deleteUserModal}
      >
        <p>
          This user will be deleted permanently.
          <br /> Are you sure you want to delete this user?
        </p>
      </Modal>
      {user.role !== "admin" && <Navigate to={`/`} />}
    </main>
  );
};

export default Users;
