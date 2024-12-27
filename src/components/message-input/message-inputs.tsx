import React, { useState } from "react";
import styles from "./message-input.module.scss";
import { Mic, Plus, SendHorizontal } from "lucide-react";
interface IMessageInputProps {
  onMessageSend: (message: string) => void;
}
const MessageInput = (props: IMessageInputProps) => {
  const [message, setMessage] = useState<string>("");
  const { onMessageSend } = props;

  const onMessageSendHandler = () => {
    onMessageSend(message.trim());
    setMessage("");
  };

  const handleMessageChange = (event: any) => {
    setMessage(event?.target?.value);
  };

  return (
    <div className={styles.message_container}>
      <Plus className={styles.plus_icon} />
      <input
        name="message"
        value={message}
        type="text"
        placeholder="Type a message"
        onChange={handleMessageChange}
        className={styles.input}
      />
      {message.length > 0 ? (
        <SendHorizontal
          className={styles.send_icon}
          onClick={onMessageSendHandler}
        />
      ) : (
        <Mic className={styles.mic_icon} />
      )}
    </div>
  );
};

export default MessageInput;
