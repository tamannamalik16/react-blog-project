import { Link } from "react-router-dom";
import "./Login.css";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import API from "../../api";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await API.post("/auth/login", {
        // username or password, passing values to /login
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  console.log(isFetching);
  return (
    <div className="login">
      <span className="loginTitle">Login Yourself</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
          type="text"
          className="loginInput"
          placeholder="enter your username"
          ref={userRef}
        ></input>
        <label>Password: </label>
        <input
          type="password"
          className="loginInput"
          placeholder="enter your pass"
          ref={passwordRef}
        ></input>
        <button className="loginSubmit" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterBtn">
        <Link className="link" to={"/register"}>
          Register
        </Link>
      </button>
    </div>
  );
}
