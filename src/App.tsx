import { Link, Outlet } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <header className="app__header">
        <ul className="app__list">
          <li>
            <Link to="/movies-db/">Home</Link>
          </li>
          <li>
            <Link to="/movies-db/about">About</Link>
          </li>
          <li>
            <Link to="/movies-db/movies">Movies</Link>
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
