import type { Action, State } from "../interface";

function boardReducer(action: Action, state?: State): State["boards"] {
  if (!state) {
    return [];
  }

  switch (action.type) {
    case "NewBoardOk":
      return [...state.boards, action.payload];
    case "FetchBoardsOk":
      return action.payload;
    default:
      return state.boards;
  }
};

export default boardReducer;
