"use client";
import { Provider } from "react-redux";
import { ReactNode, useEffect } from "react";
// import { ProviderForShareStateMobile } from "@/components/context/MyContext";
// import { store, persistor } from "./store";
import { store } from "./store";
// import { PersistGate } from "redux-persist/integration/react";
export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {/* <ProviderForShareStateMobile>{children}</ProviderForShareStateMobile> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
};

// "use client";

// import { store } from "./store";
// import { Provider } from "react-redux";

// export function Providers({ children }: { children: React.ReactNode }) {
//   return <Provider store={store}>{children}</Provider>;
// }
