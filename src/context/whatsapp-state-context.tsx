import { ReactNode, createContext, useContext } from "react";
import { IWhatsaAppState } from "@/utils/whatsapp-reducer";

export const WhatsaAppStateContext = createContext<IWhatsaAppState | null>(
  null
);

export interface WhatsaAppStateProviderProps {
  children: ReactNode;
  state: any;
}

function WhatsaAppStateProvider({
  children,
  state,
}: WhatsaAppStateProviderProps) {
  return (
    <WhatsaAppStateContext.Provider value={state}>
      {children}
    </WhatsaAppStateContext.Provider>
  );
}

export function useWhatsaAppStateContext() {
  const context = useContext(WhatsaAppStateContext);

  if (!context) {
    throw new Error(
      "useWhatsaAppStateContext must only be used within a WhatsaAppStateProvider"
    );
  }

  return context;
}

export default WhatsaAppStateProvider;
