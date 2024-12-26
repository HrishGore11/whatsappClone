import { useIWhatsaAppDisptachContext } from "@/context/whatsapp-dispatch-context";
import { useWhatsaAppStateContext } from "@/context/whatsapp-state-context";
import React from "react";
import ContactHeader from "../contact-header/contact-header";
import Chats from "../chats/chats";
import MessageInput from "../message-input/message-inputs";

const ChatWindow = () => {
  const { selectedContact, messages } = useWhatsaAppStateContext();
  const dispatch = useIWhatsaAppDisptachContext();

  const handleSendMessage = (message) => {
    const messagePayload = {
      contactId: selectedContact?.id,
      text: message,
      senderId: 1, //we can send currentuserId
      timestamp: new Date().toISOString(),
      status: "sending",
    };
    dispatch({ type: "SEND_MESSAGE", payload: messagePayload });
    console.log(message);
  };

  const filteredMessages =
    messages &&
    messages?.filter((message) => message.contactId === selectedContact?.id);

  return (
    <div>
      <ContactHeader contact={selectedContact} />
      <Chats messages={filteredMessages} />
      <MessageInput onMessageSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
