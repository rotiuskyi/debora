import type { Action, StoreUtils, State } from "../interface";

export function fetchBoards({ httpClient, dispatch }: StoreUtils, state: State): Action {
  httpClient.get("/api/boards")
    .then(res => res.json())
    .then(boards => {
      dispatch(() => ({
        type: "FetchBoardsOk",
        payload: boards
      }));
    })
    .catch(() => {

    })
    .finally(() => {

    });

  return {
    type: "FetchBoards",
    payload: null
  };
}

export function newBoard(title: string) {
  return ({ httpClient, dispatch }: StoreUtils, state: State): Action => {
    httpClient.post("/api/boards", {
      body: JSON.stringify({ title })
    })
      .then(res => res.json())
      .then(board => {
        dispatch(() => ({
          type: "NewBoardOk",
          payload: board
        }));
      });

    return {
      type: "NewBoard",
      payload: { title }
    };
  };
}
