# Live Chat App

A simple real-time chat application built with React and Node.js using WebSockets (Socket.IO). Users can join a room with a temporary username and exchange live messages instantly.

---

## Features

- Join a chat room with a temporary username
- Send and receive messages in real-time
- Shared chat rooms between multiple users
- Minimal and clean UI
- Powered by **Socket.IO** and **Vite**

---

## Tech Stack

**Frontend:** React, Vite, Socket.IO Client  
**Backend:** Node.js, Express, Socket.IO, CORS

---

## Installation

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/live-chat-app.git
cd live-chat-app

### 2. Install dependencies

**For the backend**
```bash
cd server
npm install

**For the frontend**
```bash
cd ../client
npm install

### 3. Running the App Locally

**Start the backend**
```bash
cd ../server
node index.js

**Start the frontend**
Open a new terminal
```bash
cd client
npm run dev

Then open your browser at specified url
Open it in multiple tabs to simulate multiple users chatting in the same room.