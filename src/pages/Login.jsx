import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const errMsgRef = useRef();

  const [loginButton, setLoginButton] = useState(false);

  const navigate = useNavigate();

  // console.log("hi login");
  const LogInHandle = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.length > 0) {
      console.log("email");
      if (password.length > 0) {
        setLoginButton(true);

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user.uid);
            navigate("/home");
            // ...
          })
          .catch((error) => {
            //   const errorCode = error.code;
            const errorMessage = String(error.message);
            console.log(errorMessage.split(" ")[2]);

            const err = errorMessage.split(" ")[2];
            if (err === "(auth/user-not-found).") {
              emailRef.current.style = "border: 2px solid green;";
              errMsgRef.current.innerText = "user not found";
              errMsgRef.current.style = "color:red";
            }

            if (err === "(auth/wrong-password).") {
              passwordRef.current.style = "border: 2px solid blue;";
            }
          });
      } else {
        console.log("password");
        passwordRef.current.style = "border: 2px solid red;";
      }
    } else {
      emailRef.current.style = "border: 2px solid red;";
    }
  };

  return (
    <div>
      <input
        ref={emailRef}
        type="email"
        onChange={() => {
          if (loginButton) {
            setLoginButton(false);
          }
        }}
        placeholder="email"
      />
      <br />
      <input ref={passwordRef} type="password" placeholder="password" />
      <br />
      <p ref={errMsgRef}></p>
      <button disabled={loginButton} onClick={LogInHandle}>
        Log in
      </button>
    </div>
  );
};

export default Login;
