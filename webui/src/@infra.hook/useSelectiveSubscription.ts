import { useEffect, useState } from "react";
import type { Store } from "../@infra.util/storeFactory";
import type { Action, State } from "../@store/interface";

function useSelectiveSubscription<Substate>(
  store: Store<Action, State>,
  selector: (state: State) => Substate,
) {
  const [observable, setObservable] = useState<Substate>();
  useEffect(() => {
    return store.subscribe(selector, setObservable);
  }, []);
  return observable;
}

export default useSelectiveSubscription;
