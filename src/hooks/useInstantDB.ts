import { id, i, init, InstaQLEntity } from "@instantdb/react";
import { db as localIndexDB } from "./useIndexeDB";
const APP_ID =
  process.env.REACT_APP_INSTANTDB_APP_KEY ||
  "36ad2072-c7a7-440a-97f4-81f5feb63c9b";

const schema = i.schema({
  entities: {
    messages: i.entity({
      contactId: i.string(),
      text: i.string(),
      senderId: i.string(),
      status: i.string(),
      createdAt: i.string(),
      updatedAt: i.string(),
    }),
    contacts: i.entity({
      name: i.string(),
      avatar: i.string(),
      lastMessage: i.string(),
      lastMessageTime: i.string(),
      lastActive: i.string(),
      createdAt: i.string(),
      updatedAt: i.string(),
    }),
  },
});

export type Messages = InstaQLEntity<typeof schema, "messages">;
export type Contacts = InstaQLEntity<typeof schema, "contacts">;

// const db = new InstantDB("whatsappDB");
const db = init({ appId: APP_ID, schema });

const useInstantDB = () => {
  // Fetch messages for a contact

  const fetchMessagesForId = (contactId: string | undefined) => {
    const query = {
      messages: {
        $: {
          where: {
            contactId: contactId || "0",
          },
        },
      },
    };
    const {
      isLoading: isMessageLoading,
      error: fetchMessageError,
      data: messages,
    } = db.useQuery(query);
    return { isMessageLoading, fetchMessageError, messages };
  };

  const fetchMessagesById = async (id: string) => {
    const query = {
      messages: {
        $: {
          where: {
            id,
          },
        },
      },
    };
    const {
      isLoading: isMessageByIdLoading,
      error: fetchMessageByIdError,
      data: messageById,
    } = await db.useQuery(query);
    return { isMessageByIdLoading, fetchMessageByIdError, messageById };
  };

  const fetchAllMessages = () => {
    const {
      isLoading: isAllMessagesLoading,
      error: fetchAllMessagesError,
      data: allMessages,
    } = db.useQuery({
      messages: {},
    });
    return { isAllMessagesLoading, fetchAllMessagesError, allMessages };
  };

  const fetchContacts = () => {
    const {
      isLoading: isContactsLoading,
      error: fetchContactsError,
      data: contacts,
    } = db.useQuery({
      contacts: {},
    });
    return { isContactsLoading, fetchContactsError, contacts };
  };

  const addContact = (payload: any) => {
    db.transact(
      db.tx.contacts[id()].update({
        name: payload.name,
        avatar: payload?.avatar,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    );
  };
  // Save a new message
  const saveMessage = async (payload: any) => {
    const uniqueId = id();
    const response = await db.transact(
      db.tx.messages[uniqueId].update(payload)
    );
    return { ...response, id: uniqueId };
  };

  const saveLastMessage = async (payload: any) => {
    const response = await db.transact(
      db.tx.contacts[payload?.id].update({
        lastMessage: payload.lastMessage,
        lastMessageTime: payload.lastMessageTime,
      })
    );
    console.log("response", response);
    return response;
  };

  return {
    fetchMessagesForId,
    saveMessage,
    fetchContacts,
    addContact,
    fetchMessagesById,
    saveLastMessage,
  };
};

export default useInstantDB;
