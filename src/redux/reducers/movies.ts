// import { Reducer } from "redux";
import { ActionWithPayload, createReducer } from "../utils";

export interface Movie {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  image?: string;
}

interface MovieState {
  top: Movie[];
  loading: boolean;
}

const initialState: MovieState = {
  top: [],
  loading: false,
};

export const moviesLoaded = (movies: Movie[]) => ({
  type: "movies/loaded",
  payload: movies,
});

export const moviesLoading = () => ({
  type: "movies/loading",
});

const movieReducer = createReducer<MovieState, ActionWithPayload<Movie[]>>(
  initialState,
  {
    "movies/loaded": (state, action: ActionWithPayload<Movie[]>) => {
      return {
        ...state,
        top: action.payload,
        loading: false,
      };
    },
    "movies/loading": (state) => {
      return {
        ...state,
        loading: true,
      };
    },
  }
);

// const moviesReducer: Reducer<MovieState, ActionWithPayload<Movie[]>> = (
//   state,
//   action
// ) => {
//   const currentState = state ?? initialState;

//   switch (action.type) {
//     case "movies/loaded":
//       return {
//         ...currentState,
//         top: action.payload,
//       };

//     default:
//       return currentState;
//   }
// };

// export default moviesReducer;
export default movieReducer;
