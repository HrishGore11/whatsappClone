import { useIWhatsaAppDisptachContext } from "@/context/whatsapp-dispatch-context";
import { useWhatsaAppStateContext } from "@/context/whatsapp-state-context";
import React from "react";
import ContactHeader from "../contact-header/contact-header";
import Chats from "../chats/chats";
import MessageInput from "../message-input/message-inputs";
import useInstantDB from "@/hooks/useInstantDB";
import { userId } from "@/constants/constants";
import styles from "./chat-window.module.scss";

const ChatWindow = () => {
  const { selectedContact } = useWhatsaAppStateContext();
  const dispatch = useIWhatsaAppDisptachContext();
  const { fetchMessagesForId, saveMessage, saveLastMessage } = useInstantDB();

  const handleSendMessage = async (message: string) => {
    const messagePayload = {
      contactId: selectedContact?.id,
      text: message,
      senderId: userId, //we can send currentuserId//   timestamp: new Date().toISOString(),
      status: "sent",
      createdAt: new Date().toISOString(),
    };

    const response = await saveMessage(messagePayload);
    if (response.status === "synced") {
      dispatch({
        type: "SEND_MESSAGE",
        payload: { ...messagePayload, id: response.id },
      });
    }
    const payload = {
      lastMessage: messagePayload?.text,
      lastMessageTime: messagePayload?.createdAt,
      id: messagePayload?.contactId,
    };
    await saveLastMessage(payload);
  };

  const {
    isMessageLoading,
    fetchMessageError,
    messages: filteredMessages,
  } = fetchMessagesForId(selectedContact?.id);

  console.log("filteredMessages", filteredMessages);
  if (fetchMessageError) {
    return (
      <div>There is a problem with the network please try again later</div>
    );
  }

  return (
    <div className={styles.container}>
      <ContactHeader contact={selectedContact} />
      {isMessageLoading ? (
        <div>Loading ....</div>
      ) : (
        <div className={styles.chat_container}>
          <Chats messages={filteredMessages?.messages} />
        </div>
      )}

      <MessageInput onMessageSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
