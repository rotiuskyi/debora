import type { Action, State } from "../interface";
import accountReducer from "./accountReducer";
import boardReducer from "./boardReducer";

function rootReducer(action: Action, state?: State): State {
  return {
    account: accountReducer(action, state),
    boards: boardReducer(action, state)
  };
}

export default rootReducer;
