import { Link } from "react-router-dom";

import "./Movies.css";

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
    <div className="Movies-card">
      <Link to={`/movies/${id}`}>{title}</Link>
      <div className="Movies-card-overview">{overview}</div>
      <div className="Movies-card-popularity">{popularity}</div>
    </div>
  );
}
