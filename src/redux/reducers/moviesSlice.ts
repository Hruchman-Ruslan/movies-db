import { MoviesFilters, client } from "../../api/tmdb";
import { AppThunk } from "../store";
import { ActionWithPayload, createReducer } from "../utils";
import { genres } from "../../api/genres";

export interface Movie {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  image?: string;
}

export interface Genre {
  id: number;
  name: string;
}

interface MoviesState {
  loading: boolean;
  top: Movie[];
  page: number;
  hasMorePages: boolean;
  genres: Genre[];
}

const initialState: MoviesState = {
  top: [],
  loading: false,
  page: 0,
  hasMorePages: true,
  genres,
};

function loading() {
  return {
    type: "movies/loading",
  };
}

function loaded(movies: Movie[], page: number, hasMorePages: boolean) {
  return {
    type: "movies/loaded",
    payload: { movies, page, hasMorePages },
  };
}

export function resetMovies() {
  return {
    type: "movies/reset",
  };
}

export const fetchNextPage = (
  filters: MoviesFilters = {}
): AppThunk<Promise<void>> => {
  return async (dispatch, getState) => {
    const nextPage = getState().movies.page + 1;
    dispatch(fetchPage(nextPage, filters));
  };
};

function fetchPage(
  page: number,
  filters: MoviesFilters
): AppThunk<Promise<void>> {
  return async (dispatch) => {
    dispatch(loading());

    const configuration = await client.getConfiguration();
    const moviesResponse = await client.getMovies(page, filters);
    const imageSize = "w780";
    const movies: Movie[] = moviesResponse.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      popularity: movie.popularity,
      image: movie.backdrop_path
        ? `${configuration.images.base_url}${imageSize}${movie.backdrop_path}`
        : undefined,
    }));

    const hasMorePages = moviesResponse.page < moviesResponse.totalPages;

    dispatch(loaded(movies, page, hasMorePages));
  };
}

const moviesReducer = createReducer<MoviesState>(initialState, {
  "movies/loading": (state) => {
    return { ...state, loading: true };
  },
  "movies/loaded": (
    state,
    action: ActionWithPayload<{
      movies: Movie[];
      page: number;
      hasMorePages: boolean;
    }>
  ) => {
    return {
      ...state,
      top: [...state.top, ...action.payload.movies],
      page: action.payload.page,
      hasMorePages: action.payload.hasMorePages,
      loading: false,
    };
  },
  "movies/reset": () => {
    return { ...initialState };
  },
});

export default moviesReducer;
