"use client";
import ContactList from "@/components/contact-list/contact-list";
import WhatsAppDispatchProvider from "@/context/whatsapp-dispatch-context";
import WhatsaAppStateProvider from "@/context/whatsapp-state-context";
import WhatsappReducer, {
  initialWhatsappStateValue,
} from "@/utils/whatsapp-reducer";
import React, { useEffect, useReducer } from "react";
import styles from "./whatsapp.module.scss";
import ChatWindow from "@/components/chat-window/chat-window";
import useInstantDB from "@/hooks/useInstantDB";

const Whatsapp = () => {
  const { addContact, fetchContacts } = useInstantDB();
  useEffect(() => {
    addContact({
      name: "Bob Johnson",
      avatar: "https://example.com/avatar3.png",
    });
  }, []);
  const { isContactsLoading, contacts } = fetchContacts();
  console.log("loadingContacts", isContactsLoading, contacts);
  const [state, dispatch] = useReducer(
    WhatsappReducer,
    initialWhatsappStateValue
  );
  console.log(state);
  return (
    <WhatsaAppStateProvider state={state}>
      <WhatsAppDispatchProvider dispatch={dispatch}>
        <div className={styles.container}>
          <ContactList />
          {state?.selectedContact ? (
            <ChatWindow />
          ) : (
            <div> No Contact Selected </div>
          )}
        </div>
      </WhatsAppDispatchProvider>
    </WhatsaAppStateProvider>
  );
};

export default Whatsapp;
