import {Outlet, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/signin">Sign In</Link> |{" "}
        <Link to="/signup">SignUp</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
