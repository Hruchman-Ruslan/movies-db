import { Action } from "redux";

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

type ACtionHandlers<S, A extends Action> = {
  [key: string]: (state: S, action: A) => S;
};

export function createReducer<TState, TAction extends Action>(
  initialState: TState,
  handlers: ACtionHandlers<TState, TAction>
) {
  return function (state: TState, action: TAction) {
    // state = state ?? initialState;

    //   same below
    state ??= initialState;
    const handler = handlers[action.type];

    // if (handler) {
    //   return handler(state, action);
    // }

    //   return state;

    //   same below
    return handler?.(state, action) ?? state;
  };
}
