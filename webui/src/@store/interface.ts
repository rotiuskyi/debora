import type { Account, Board, Device, PostBoardRequestBody } from "./models";

type SyncActionType =
  | "NewBoard"
  | "UpdateBoard"
  | "FetchBoards"
  | "NewDevice"
  | "UpdateDevice"
  | "RemoveDevice"
  | "RemoveBoard"
  ;

export type ActionType = SyncActionType | `${SyncActionType}Ok` | `${SyncActionType}Fail`;

// TODO: set update/create params
export type Action =
  | AsyncAction<"NewBoard", PostBoardRequestBody, Board, unknown>
  | AsyncAction<"UpdateBoard", unknown, Board, unknown>
  | AsyncAction<"FetchBoards", unknown, Board[], unknown>
  | AsyncAction<"NewDevice", unknown, Device, unknown>
  | AsyncAction<"UpdateDevice", unknown, Device, unknown>
  | AsyncAction<"RemoveDevice", unknown, unknown, unknown>
  | AsyncAction<"RemoveBoard", unknown, unknown, unknown>
  ;

export interface State {
  account: Account | null;
  boards: Board[];
}

// Utility types
export interface DispatchFunc {
  (actionCreator: (utils: StoreUtils, state: State) => Action): void;
}

export interface StoreUtils {
  dispatch: DispatchFunc;
  httpClient: HttpClient;
}

export interface HttpClient {
  get(uri: string, opts?: RequestOptions): Promise<Response>;
  post(uri: string, opts?: RequestOptions): Promise<Response>;
  put(uri: string, opts?: RequestOptions): Promise<Response>;
  delete(uri: string, opts?: RequestOptions): Promise<Response>;
}

export type RequestOptions = Omit<RequestInit, "method">;

type SyncAction<T extends SyncActionType, P = unknown> = {
  type: T;
  payload: P;
};

type AsyncAction<
  T extends ActionType,
  P1 = unknown,
  P2 = unknown,
  P3 = unknown
> = {
  type: T;
  payload: P1;
} | {
  type: `${T}Ok`,
  payload: P2
} | {
  type: `${T}Fail`,
  payload: P3
};
