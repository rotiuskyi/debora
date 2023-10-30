import { PropsWithChildren, createContext, useContext } from "react";
import httpClientFactory from "./@infra.util/httpClientFactory";
import storeFactory from "./@infra.util/storeFactory";
import { useHttpBeforeHook, useHttpAfterHook } from "./@infra.hook/useHttpClientHooks";
import useSelectiveSubscription from "./@infra.hook/useSelectiveSubscription";
import type { Action, HttpClient, State } from "./@store/interface";
import rootReducer from "./@store/reducers/rootReducer";

interface CtxValue {
  httpClient: HttpClient;
  store: ReturnType<typeof storeFactory<Action, State>>;
  useSelectiveSubscription: typeof useSelectiveSubscription;
}

const Ctx = createContext<CtxValue | undefined>(undefined);

export function useDependencies() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error(`Failed to get ${DependencyProvider.name} Context.`);
  }
  return ctx;
}

function DependencyProvider({ children }: PropsWithChildren) {
  const before = useHttpBeforeHook();
  const after = useHttpAfterHook();
  const httpClient = httpClientFactory({ before, after });
  const store = storeFactory<Action, State>(rootReducer, httpClient);

  return (
    <Ctx.Provider value={{
      httpClient,
      store,
      useSelectiveSubscription
    }}>
      {children}
    </Ctx.Provider>
  );
}

export default DependencyProvider;
