export interface IContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: string;
  lastActive?: string;
}

export interface IMessage {
  id: string;
  contactId: number;
  text: string;
  sender: number;
  timestamp: string;
  status: string;
}
