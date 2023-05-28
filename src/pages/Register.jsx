import { createUserWithEmailAndPassword } from "firebase/auth";
import db, { auth } from "../firebase/firebase";
import { useRef, useState } from "react";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  const signInHandle = () => {
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setDoc(doc(db, "registeruser", user.uid), {
          name,
          phone,
          address,
          role: "user",
        })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
  };

  return (
    <div>
      <input ref={nameRef} type="text" placeholder="yout name" />
      <br />
      <input ref={phoneRef} type="text" placeholder="yout phone" />
      <br />
      <input ref={addressRef} type="text" placeholder="yout address" />
      <br />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="email"
      />
      <br />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      <br />
      <button onClick={signInHandle}>Sign in</button>
    </div>
  );
};

export default Register;
