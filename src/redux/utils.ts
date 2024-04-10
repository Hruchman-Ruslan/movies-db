import { Action } from "redux";

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

type ACtionHandlers<S> = {
  [key: string]: (state: S, action: any) => S;
};

export function createReducer<TState>(
  initialState: TState,
  handlers: ACtionHandlers<TState>
) {
  return function (state: TState, action: Action) {
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
