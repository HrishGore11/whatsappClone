import { id, i, init, InstaQLEntity } from "@instantdb/react";
const APP_ID = "36ad2072-c7a7-440a-97f4-81f5feb63c9b";
// Initialize InstantDB
const schema = i.schema({
  entities: {
    messages: i.entity({
      contactId: i.string(),
      text: i.string(),
      sender: i.number(),
      status: i.string(),
      createdAt: i.string(),
    }),
    contacts: i.entity({
      name: i.string(),
      avatar: i.string(),
      lastMessage: i.string(),
      lastMessageTime: i.string(),
      lastActive: i.string(),
      createdAt: i.string(),
    }),
  },
});

type Messages = InstaQLEntity<typeof schema, "messages">;
type Contacts = InstaQLEntity<typeof schema, "contacts">;

// const db = new InstantDB("whatsappDB");
const db = init({ appId: APP_ID, schema });

const useInstantDB = () => {
  // Fetch messages for a contact

  const fetchMessages = (contactId: string) => {
    const {
      isLoading: isMessageLoading,
      error: fetchMessageError,
      data: messages,
    } = db.useQuery({
      messages: {},
    });
    return { isMessageLoading, fetchMessageError, messages };
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

  const addContact = (payload) => {
    db.transact(
      db.tx.contacts[id()].update({
        name: payload.name,
        avatar: payload?.avatar,
        createdAt: new Date().toISOString(),
      })
    );
  };
  // Save a new message
  const saveMessage = (contactId, message) => {
    const newMessage = {
      contactId,
      text: message,
      timestamp: new Date().toISOString(),
    };
    return db.messages.insert(newMessage);
  };

  return { fetchMessages, saveMessage, fetchContacts, addContact };
};

export default useInstantDB;
