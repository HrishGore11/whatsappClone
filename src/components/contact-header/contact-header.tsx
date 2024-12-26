import { IContact } from "@/models/interfaces";
import Image from "next/image";
import React from "react";
import styles from "./contact-header.module.scss";
import { lastSeen } from "@/utils/shared-utils";

interface IContactHeaderProps {
  contact: IContact | null;
}
const ContactHeader = (props: IContactHeaderProps) => {
  const { contact } = props;
  return (
    <div className={styles.header_container}>
      <div className={styles.image_container}>
        <Image
          alt="contact image"
          height={40}
          width={40}
          src={"/vercel.svg"}
          // className={styles.avtar_image}
        ></Image>
      </div>
      <div className={styles.contact_container}>
        <div className={styles.contact_name}>{contact?.name}</div>
        {contact?.lastActive && (
          <div className={styles.last_seen}>
            last Active {lastSeen(contact?.lastActive)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactHeader;
