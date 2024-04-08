import { Link } from "react-router-dom";

import styles from "./MovieCard.module.scss";

export interface MovieCardProps {
  id: number;
  title: string;
  popularity: number;
  overview: string;
}

export default function MovieCard({
  id,
  overview,
  popularity,
  title,
}: MovieCardProps) {
  return (
    <div className={styles.card}>
      <img
        className={styles.thumbnail}
        src="./public/movie-thumb.png"
        alt="Movie thumbnail"
      />
      <div className={styles.content}>
        <div>
          <Link to={`/movies/${id}`}>{title}</Link>
        </div>
        <div className={styles.overview}>{overview}</div>
        <div className={styles.popularity}>{popularity}</div>
      </div>
    </div>
  );
}
