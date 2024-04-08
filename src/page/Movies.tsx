import { connect } from "react-redux";
import { Movie } from "../redux/reducers/movies";
import { RootState } from "../redux/store";

import MovieCard from "../components/MovieCard/MovieCard";
import "../components/MovieCard/Movies.css";

interface MoviesProps {
  movies: Movie[];
}

function Movies({ movies }: MoviesProps) {
  return (
    <section>
      <div className="Movies-list">
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            id={m.id}
            title={m.title}
            overview={m.overview}
            popularity={m.popularity}
          />
        ))}
      </div>
    </section>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
});

const connector = connect(mapStateToProps);

export default connector(Movies);
