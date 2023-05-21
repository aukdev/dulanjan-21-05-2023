import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/globle.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
