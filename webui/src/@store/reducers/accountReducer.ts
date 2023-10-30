import type { Action, State } from "../interface";

function accountReducer(action: Action, state?: State): State["account"] {
  if (!state) {
    return null;
  }

  switch (action.type) {
    default:
      return state.account;
  }
};

export default accountReducer;
