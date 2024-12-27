import { IWhatsaAppReducerAction } from "@/utils/whatsapp-reducer";
import { Dispatch, ReactNode, createContext, useContext } from "react";

export const IWhatsaAppDisptachContext =
  createContext<Dispatch<IWhatsaAppReducerAction> | null>(null);

export interface WhatsaAppDisptachProviderProps {
  children: ReactNode;
  dispatch: Dispatch<IWhatsaAppReducerAction>;
}

function WhatsAppDispatchProvider({
  children,
  dispatch,
}: WhatsaAppDisptachProviderProps) {
  return (
    <IWhatsaAppDisptachContext.Provider value={dispatch}>
      {children}
    </IWhatsaAppDisptachContext.Provider>
  );
}

export function useIWhatsaAppDisptachContext() {
  const context = useContext(IWhatsaAppDisptachContext);

  if (!context) {
    throw new Error(
      "useWhatsaAppDisptachContext must only be used within a WhatsappChat"
    );
  }

  return context;
}

export default WhatsAppDispatchProvider;
