import { useIWhatsaAppDisptachContext } from "@/context/whatsapp-dispatch-context";
import { useWhatsaAppStateContext } from "@/context/whatsapp-state-context";
import React from "react";
import Contact from "../contact/contact";
import styles from "./contact-list.module.scss";
import { IContact } from "@/models/interfaces";
import { EllipsisVertical } from "lucide-react";

const ContactList = () => {
  const { contacts } = useWhatsaAppStateContext();
  const dispatch = useIWhatsaAppDisptachContext();

  const selectContact = (contact: IContact) => {
    dispatch({ type: "SELECT_CONTACT", payload: contact });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <div className={styles.header}>Chats</div>
        <EllipsisVertical className={styles.menu_icon} />
      </div>
      <div className={styles.contact_list}>
        {contacts && contacts?.length > 0 ? (
          contacts?.map((contact, index) => (
            <Contact
              onContactClick={selectContact}
              contactInfo={contact}
              key={index}
            />
          ))
        ) : (
          <div>No contacts available</div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
