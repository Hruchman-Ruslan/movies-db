import { Link, Outlet } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <header className="app__header">
        <ul className="app__list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
