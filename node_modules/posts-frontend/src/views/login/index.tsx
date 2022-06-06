import { useContext } from "react";
import { useForm } from "react-hook-form";
import UserContext from "../../context/UserContext";
import login from "../../helpers/login/login";
import { Navigate } from "react-router-dom";

import styles from "./styles.module.css";

const Login = () => {
  const { userData, setUserData } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data: any) => {
    const response = await login(data.username, data.password);
    if (response) {
      localStorage.setItem("token", JSON.stringify(response.access_token));
      localStorage.setItem("user", JSON.stringify(response.user));
      setUserData({
        userId: response.user.userId,
        email: response.user.email,
        name: response.user.name,
        role: response.user.role,
        token: response.access_token,
      });
    }
    // reset();
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Please, enter your credentials</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Email</label>
          <input
            id="username"
            {...register("username", {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
          />
          {errors.username && errors.username.type === "required" && (
            <span>This is required</span>
          )}
          {errors.username && (
            <span role="alert">{errors.username.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={"password"}
            {...register("password", { required: true })}
          />
          {errors.password && errors.password.type === "required" && (
            <span>This is required</span>
          )}
        </div>
        <input type="submit" className={styles.submitButton} />
      </form>
      {localStorage.getItem("token") && <Navigate to="/" />}
    </div>
  );
};
export default Login;
