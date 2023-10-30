// TypeScript interface for WithAuthorization definition
export interface WithAuthorization {
  authorization: string;
}

// TypeScript interface for Account definition
export interface Account {
  id: string;
  user_email: string;
  user_name: string;
  issuer: string;
  picture: string;
}

// TypeScript interface for Device definition
export interface Device {
  id: number;
  title: string;
}

// TypeScript interface for Board definition
export interface Board {
  id: number;
  title: string;
  owner: string;
  description?: string | null;
  devices: Device[];
}

// TypeScript interface for the response of GET /api/account endpoint
export interface GetAccountResponse {
  data: Account;
}

// TypeScript interface for the response of GET /api/boards endpoint
export interface GetBoardsResponse {
  data: Board[];
}

// TypeScript interface for the request body of POST /api/boards endpoint
export interface PostBoardRequestBody {
  title: string;
}

// TypeScript interface for the response of POST /api/boards endpoint
export interface PostBoardResponse {
  // Define the response if needed, but it's not specified in the spec
}

// TypeScript interface for the response of DELETE /api/boards/{boardId} endpoint
export interface DeleteBoardResponse {
  // Define the response if needed, but it's not specified in the spec
}
