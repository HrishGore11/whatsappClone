export interface IContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: string;
  createdAt?: string;
  updatedAt?: string;
  lastActive?: string;
}

export interface IMessage {
  id: string;
  contactId: number;
  text: string;
  senderId: string;
  createdAt: string;
  updatedAt?: string;
  status: string;
}
