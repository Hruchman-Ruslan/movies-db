import { Action, Reducer } from "redux";

export interface Movie {
  id: number;
  title: string;
  popularity: number;
  overview: string;
}

interface MoviesState {
  top: Movie[];
}

const initialState: MoviesState = {
  top: [
    { id: 1, title: "Inception", popularity: 90, overview: "Dreams..." },
    { id: 2, title: "The Godfather", popularity: 95, overview: "Godfather..." },
    {
      id: 3,
      title: "The Dart Knight",
      popularity: 98.5,
      overview: "Batman...",
    },
    {
      id: 4,
      title: "The Godfather Part II",
      popularity: 94,
      overview: "Part II...",
    },
  ],
};

// const moviesReducer: Reducer<MoviesState, Action> = (state, action) => {
//   return initialState;
// };

// fix deploy
const moviesReducer: Reducer<MoviesState, Action> = (state = initialState) => {
  return state;
};

export default moviesReducer;
