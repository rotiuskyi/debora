import type { DispatchFunc, HttpClient, StoreUtils } from "../@store/interface";

export type Store<A extends ActionShape, S> = ReturnType<typeof storeFactory<A, S>>;

interface ActionShape {
  type: string;
  payload: any;
}

interface Reducer<A, S> {
  (action: A, state?: S): S;
}

function storeFactory<Action extends ActionShape, State>(
  reducer: Reducer<Action, State>,
  httpClient: HttpClient
) {
  let value = reducer({ type: "@INIT", payload: null } as Action);
  let previousValue = value;

  const subscribers = new Map();

  function subscribe<Substate>(
    selector: (state: State) => Substate,
    callback: (substate: Substate) => void
  ) {
    subscribers.set(callback, selector);
    return (() => subscribers.delete(callback)) as () => void;
  }

  function dispatch(
    actionCreator: (utils: StoreUtils, state: State) => Action
  ) {
    value = reducer(actionCreator({
      httpClient,
      dispatch: dispatch as unknown as DispatchFunc
    }, value), value);

    for (const [callback, selector] of subscribers) {
      const prev = selector(previousValue);
      const curr = selector(value);

      if (curr !== prev) {
        callback(curr);
      }
    }

    previousValue = value;
  }

  return {
    subscribe,
    dispatch
  };
}

export default storeFactory;
