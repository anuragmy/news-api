import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import firebase from "./../config";
import { googleNewsLink } from "../constants";
import { isAuth } from "../store/auth/actions";

const Login = () => {
  const dispatch = useDispatch();
  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        dispatch(
          isAuth({
            token: res.credential.accessToken,
            name: res.additionalUserInfo.profile.name,
            profile: res.additionalUserInfo.profile.picture,
          })
        );
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%) ",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,108,121,1) 41%, rgba(0,212,255,1) 100%)",
      }}
    >
      <img
        src={googleNewsLink}
        alt="news"
        height={108}
        style={{ marginBottom: 30 }}
      />
      <Button onClick={signIn}>Login</Button>;
    </div>
  );
};

export default Login;
