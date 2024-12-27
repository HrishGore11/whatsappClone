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

  const { isContactsLoading, contacts } = fetchContacts();

  useEffect(() => {
    handleContacts();
  }, [isContactsLoading, contacts?.contacts]);

  const handleContacts = async () => {
    if (!isContactsLoading) {
      if (contacts && contacts?.contacts?.length > 0) {
        dispatch({ type: "SET_CONTACTS", payload: contacts?.contacts });
      } else {
        try {
          await addContact({
            name: "Bob Johnson",
            avatar: "https://i.pravatar.cc/300?img=5",
          }); // Add contact to the database
          console.log("Default contact added and dispatched.");
        } catch (error) {
          console.error("Error adding default contact:", error);
        }
      }
    }
  };

  const [state, dispatch] = useReducer(
    WhatsappReducer,
    initialWhatsappStateValue
  );
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
