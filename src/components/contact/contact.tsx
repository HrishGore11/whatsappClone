import React from "react";
import Image from "next/image";
import styles from "./contact.module.scss";
import { IContact } from "@/models/interfaces";
import { format } from "date-fns";

interface IContactProps {
  contactInfo: IContact;
  onContactClick: (contact: IContact) => void;
}
const Contact = (props: IContactProps) => {
  const { contactInfo, onContactClick } = props;
  const handleContact = () => {
    onContactClick(contactInfo);
  };
  return (
    contactInfo && (
      <div onClick={handleContact} className={styles.contact_container}>
        <div className={styles.image_container}>
          <Image
            alt="contact image"
            height={40}
            width={40}
            src={contactInfo?.avatar || "/vercel.svg"}
            className={styles.avtar_image}
          ></Image>
        </div>
        <div className={styles.chat_name_container}>
          <div className={styles.contact_name_time_container}>
            <div className={styles.contact_name}>{contactInfo?.name}</div>
            {contactInfo?.lastMessageTime && (
              <div className={styles.last_message_time}>
                {format(new Date(contactInfo?.lastMessageTime), "hh:mm a")}
              </div>
            )}
          </div>
          <div className={styles.lastMessage_container}>
            <div className={styles.last_message}>
              {contactInfo?.lastMessage}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Contact;
