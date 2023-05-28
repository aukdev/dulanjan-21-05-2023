import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/globle.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/home" Component={Home} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
