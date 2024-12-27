# WhatsApp Web-like Application with IndexedDB and InstantDB

Live app:

1. 'https://whatsapp-clone-nine-rho.vercel.app/'
2. 'https://whatsapp-clone-git-main-hrishgore11s-projects.vercel.app/'

## Overview

This project implements a WhatsApp Web-like application with the following features:

- **Real-Time Messaging**: Instant message updates using InstantDB.
- **Offline Support**: Local storage of data using IndexedDB.
- **Contacts and Chat Management**: Fetching, displaying, and managing contacts and chat messages.

## Technologies Used

1. **React.js**: Frontend framework for building the user interface.
2. **InstantDB**: Real-time database for message storage and retrieval.
3. **IndexedDB**: Browser-based database for offline storage.

## Features

### Core Functionalities

1. **Contact List**: Display a list of contacts.
2. **Chat Window**: Show the chat history of the selected contact.
3. **Real-Time Messaging**: Send and receive messages instantly.
4. **Offline Mode**: Load data from IndexedDB when offline.

### State Management

- **React Context**: Global state management for contacts and messages.
- **useReducer**: Efficient state updates for complex actions.

### Custom Hooks

- `useInstantDB`: Interact with InstantDB for real-time data.
- `useIndexedDB`: Manage IndexedDB operations for local storage.

## Setup and Installation

### Prerequisites

- Node.js and npm installed.
- InstantDB account and application key.

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file.
   - Add your InstantDB application key:
     ```
     REACT_APP_INSTANTDB_APP_KEY=your-app-key
     ```

4. Start the application:
   ```bash
   npm start
   ```
