import { IContact, IMessage } from "@/models/interfaces";
import { useMemo } from "react";

export interface IWhatsaAppState {
  contacts: IContact[];
  selectedContact: IContact | null;
  messages: IMessage[];
}

export interface IWhatsaAppReducerAction {
  type: WhatsAppReducerActionTypes;
  payload: any;
}

export type WhatsAppReducerActionTypes =
  | "ADD_CONTACT"
  | "SELECT_CONTACT"
  | "SEND_MESSAGE"
  | "SET_CONTACTS";

export const initialWhatsappStateValue: IWhatsaAppState = {
  contacts: [
    // {
    //   id: "1",
    //   name: "John Doe",
    //   avatar: "https://example.com/avatar1.png",
    //   // lastMessage: "Hey, how are you?",
    //   lastActive: "2024-12-23T14:30:00Z",
    // },
    // {
    //   id: "2",
    //   name: "Jane Smith",
    //   avatar: "https://example.com/avatar2.png",
    //   lastActive: "2024-12-23T18:45:00Z",
    // },
    // {
    //   id: "3",
    //   name: "Bob Johnson",
    //   avatar: "https://example.com/avatar3.png",
    //   lastActive: "2024-12-24T09:10:00Z",
    // },
  ],
  selectedContact: null,
  messages: [],
};

export const WhatsappReducer = (
  state: IWhatsaAppState,
  action: IWhatsaAppReducerAction
): IWhatsaAppState => {
  const addContact = (second: any) => {
    console.log(second);
    return { ...state };
  };
  const setContacts = (contacts: IContact[]) => ({ ...state, contacts });

  const selectContact = (contact: IContact) => {
    return { ...state, selectedContact: contact };
  };

  const sendMessage = (payload: any) => {
    const updatedContacts = state.contacts.map((contact) =>
      contact.id === payload.contactId
        ? {
            ...contact,
            lastMessage: payload.text,
            lastMessageTime: new Date().toISOString(),
            lastActive: new Date().toISOString(),
          }
        : contact
    );
    return {
      ...state,
      messages: [
        ...state.messages,
        { ...payload, id: new Date().toISOString() },
      ],
      contacts: updatedContacts,
      selectedContact: {
        ...state.selectedContact,
        lastMessage: payload?.text,
        lastMessageTime: new Date().toISOString(),
        lastActive: new Date().toISOString(),
      },
    };
  };

  let newWhatsappState;
  switch (action.type) {
    case "ADD_CONTACT":
      newWhatsappState = addContact(action.payload);
      break;
    case "SELECT_CONTACT":
      newWhatsappState = selectContact(action.payload);
      break;
    case "SEND_MESSAGE":
      newWhatsappState = sendMessage(action.payload);
      break;
    case "SET_CONTACTS":
      newWhatsappState = setContacts(action.payload);
      break;
    default:
      break;
  }
  return newWhatsappState as IWhatsaAppState;
};

export default WhatsappReducer;
