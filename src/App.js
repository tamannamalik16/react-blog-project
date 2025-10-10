import TopBar from "./topbar/TopBar.jsx";
import Home from "./pages/home/Home.jsx"; 
import Single from "./pages/single/Single.jsx";
import Write from "./pages/write/Write.jsx";
import Setting from "./pages/setting/Setting.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context.js";

function App() {
  const { user }  = useContext(Context);
  return (
    <Router>
    <TopBar />
    <Routes>
      <Route path="/" element={<Home />} >
      </Route>
      <Route path="/register" element={user ? <Home /> : <Register />} >
      </Route>
      <Route path="/login" element={user ? <Home /> : <Login />} >
      </Route>
      <Route path="/write" element={user ? <Write /> : <Register />} >
      </Route>
      <Route path="/setting" element={user ? <Setting /> : <Register />} >
      </Route>
      <Route path="/post/:postId" element={<Single />} >
      </Route>
    </Routes>

    </Router>

  );
}

export default App;
