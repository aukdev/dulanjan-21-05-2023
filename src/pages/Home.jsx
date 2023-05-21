import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const user = auth.currentUser;
      if (!user) {
        console.log("hi");
        navigate("/login");
      }
    }, 1000);
  }, []);

  const click = () => {
    const user = auth.currentUser;

    console.log(user.uid);
  };

  const signOutHandle = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("You are login out");
      })
      .catch((error) => {
        // An error happened.
        alert("can not login out have some error");
      });
  };

  return (
    <div>
      <button onClick={click}>click</button>
      <button onClick={signOutHandle}>Sign out</button>
    </div>
  );
};

export default Home;
