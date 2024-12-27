import React from "react";
import styles from "./chats.module.scss";
import { format } from "date-fns";
import { userId } from "@/constants/constants";
interface IChatsProps {
  messages: any;
}
const Chats = (props: IChatsProps) => {
  const { messages } = props;
  return (
    <div className={styles.message_container}>
      {messages?.length > 0 &&
        messages?.map((message: any) => (
          <div
            key={message.id}
            className={`${styles.message_div} ${
              message.sender === userId
                ? styles.message_div_in
                : styles.message_div_out
            }`}
          >
            <div
              className={`${styles.message} ${
                message.sender === 1 ? styles.message_in : styles.message_out
              }`}
            >
              <p className={styles.message_text}>{message?.text}</p>
              <small className={styles.message_time}>
                {format(new Date(message?.createdAt), "hh:mm a")}
              </small>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
