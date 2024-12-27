WhatsApp Web-like Application with Real-Time Messaging

Objective:
Build a WhatsApp Web-like application using React.js. The app will display a contact list on the left, a chat window on the right, and allow users to send and receive messages in real time using InstantDB for message storage and IndexedDB for offline capabilities.

Technologies & Libraries Used:

- React.js: JavaScript library for building user interfaces.
- InstantDB: A real-time database to store and retrieve messages.
- IndexedDB: A low-level API for client-side storage in the browser.
- CSS (Flexbox, Grid, Animations): For responsive and interactive UI design.
- Custom React Hooks: For reusable logic (e.g., interacting with databases).
- React Context & useReducer: For global state management.

Application Features:

1. Contact List: Displays a list of contacts on the left side.
2. Chat Window: Displays chat history for the selected contact on the right.
3. Message Field: Allows users to type and send new messages.
4. Real-Time Messaging: Uses InstantDB to handle real-time message sending and receiving.
5. Offline Capability: Uses IndexedDB to store messages locally when offline.

Project Structure:
/src

/components

- /contact-list/contact-list.tsx/module.scss // Displays list of contacts
- /contact/contact.tsx/module.scss // Display contact in Contact List
- /chat-window/chat-window.tsx /module.scss // Displays contact header, chat history and message input field
- /contact-header/contact-header.tsx/module.scss //Displays selected contact
- /chats/chats.tsx/module.scss // Displays chat history
- /message-input/message-input.tsx/module.scss // Input field for new messages

/context

- whatsapp-state-context.tsx // Context for state globally
- whatsapp-dispatch-context.tsx // context for mutate the state globally

/hooks

- useInstantDB.ts // Custom hook for InstantDB interactions
- useIndexedDB.ts // Custom hook for IndexedDB operations

/styles

- added scss modules for respective components

/app

- whatsapp.tsx/module.scss // App component
- page.tsx //main APP Component

Step-by-Step Implementation:

1. Setting Up the Project:

- Use create-react-app or Vite to initialize the project:
  npx create-react-app whatsapp-clone

  # or

  npm init vite@latest whatsapp-clone --template react

- Install required dependencies:
  npm install idb instantdb

2. React Context & useReducer

AppContext.js:
We will use React Context and useReducer to globally manage the state of contacts and messages.

3. Custom Hooks

useInstantDB.ts:
This hook will interact with InstantDB for real-time message storage and retrieval.

useIndexedDB.ts:
This hook will handle storing and retrieving messages from IndexedDB when the user is offline.

Conclusion

This documentation outlines the structure and implementation for a WhatsApp Web-like application with real-time messaging and offline support. By using React Context, custom hooks, InstantDB for real-time messaging, and IndexedDB for offline storage, we can achieve the desired functionality. Make sure to test each feature thoroughly, ensuring real-time message synchronization and offline capabilities work as expected.

Design Choices:
Functional-Based Components:

I chose functional-based components to leverage React hooks like useState, useEffect, and useReducer. Functional components are simpler, more concise, and offer better performance compared to class-based components. This choice aligns with modern React practices and promotes a cleaner and more maintainable codebase.
Component Reusability:

I focused on designing components with reusability in mind. Components such as ContactList, ChatWindow, Message, and MessageInput are designed to be self-contained and reusable across different parts of the application. This approach promotes maintainability, testing, and scalability. By making components modular and independent, I can easily reuse or modify them without affecting other parts of the application.

Challenges Faced:
Real-Time Synchronization:

A key challenge was ensuring real-time synchronization of messages between different users. InstantDB handled the real-time updates, but integrating it with React's state management was complex. Ensuring the UI updated efficiently without unnecessary re-renders took some fine-tuning. Handling updates for new messages from different users in a smooth, responsive way required careful attention to how data flows between components.
Offline Functionality:

The most significant challenge was implementing offline functionality using IndexedDB. Storing messages locally in IndexedDB and ensuring they were correctly synced with InstantDB once the user came back online was tricky. A primary issue was handling message conflict resolution—if a user sent a message offline and the same message was sent online later, proper handling was required to avoid duplication or loss of data. This required additional logic and extensive testing to ensure a seamless user experience.

The first-time use of both IndexedDB and InstantDB also posed challenges. I had to learn how to interact with both databases effectively, ensuring that messages were stored correctly in IndexedDB when offline and synced to InstantDB once the connection was restored. Debugging issues with database connections and ensuring messages were not lost or duplicated was a time-consuming process.
