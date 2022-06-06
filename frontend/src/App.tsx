import { useState } from "react";
import UserContext from "./context/UserContext";
import { Routes, Route } from "react-router-dom";
import {
  Posts,
  Users,
  Login,
  PostsForm,
  Read,
  EditPost,
  NewUser,
  EditUser,
  Logs,
} from "./views";
import Header from "./fragments/header";

import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    userId: "",
    email: "",
    name: "",
    role: "",
    token: "",
  });
  const value = { userData, setUserData };
  return (
    <UserContext.Provider value={value}>
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/create" element={<PostsForm />} />
        <Route path="/users/create" element={<NewUser />} />
        <Route path="/posts/read/:id" element={<Read />} />
        <Route path="/posts/edit/:id" element={<EditPost />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
