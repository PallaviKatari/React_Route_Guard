import * as React from "react";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation
} from "react-router-dom";
import AuthUser from "./AuthUser";

const Home = () => <h1>Home (Public Route)</h1>;
const About = () => <h1>About (Public Route)</h1>;

const Dashboard = () => <h1>Dashboard (Private)</h1>;
const Profile = () => <h1>Profile (Private)</h1>;

const Login = () => {
  const navigate = useNavigate();
  const { login } = AuthUser();
  const { state } = useLocation();

  const handleLogin = () => {
    login().then(() => {
      navigate(state?.path || "/dashboard");
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text"/>
      </div>
      <div>
        Password<br />
        <input type="password"/>
      </div>
    </div>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

function Nav() {
  const { authenticate, logout, login } = AuthUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
       
        {/* <li>{!authenticate && <button onClick={handleLogin}>Login</button>}</li> */}
      </ul>
      {authenticate && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

function RequireAuthentication({ children }) {
  const { authenticate } = AuthUser();
  const location = useLocation();

  return authenticate === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuthentication>
              <Dashboard />
            </RequireAuthentication>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuthentication>
              <Profile />
            </RequireAuthentication>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
