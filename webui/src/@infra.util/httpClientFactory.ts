import type { HttpClient, RequestOptions } from "../@store/interface";

interface BeforeHook {
  (init: RequestInit): RequestInit;
}

interface AfterHook {
  (response: Response): Response;
}

interface HttpClientOptions {
  baseUrl?: string;
  initRequestOptions?: RequestOptions;
  before?: BeforeHook;
  after?: AfterHook;
}

type Method = "GET" | "POST" | "PUT" | "DELETE";

function httpClientFactory({
  baseUrl = "",
  initRequestOptions,
  after,
  before = identity
}: HttpClientOptions = {}): HttpClient {
  function requestFactory(method: Method) {
    return (uri: string, requestOptions: RequestOptions = {}) => {
      const init: RequestInit = before({ ...initRequestOptions, ...requestOptions, method });
      return fetch(baseUrl + uri, init).then(after);
    };
  }

  return {
    get: requestFactory("GET"),
    post: requestFactory("POST"),
    put: requestFactory("PUT"),
    delete: requestFactory("DELETE")
  };
}

function identity<T extends any>(arg: T): T {
  return arg;
}

export default httpClientFactory;
