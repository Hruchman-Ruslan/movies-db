import { Link, Outlet } from "react-router-dom";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <img className={styles.logo} src="./public/cinema-ico.png" alt="logo" />
        <ul>
          <li>
            <Link className={styles.link} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/movies">
              Movies
            </Link>
          </li>
        </ul>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
