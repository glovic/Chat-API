# Chat API Real-Time Messaging Backend 

The Chat API is a backend service for a real-time chat application that supports user registration, authentication, one-on-one messaging, and group chat functionality. It leverages Node.js, Express.js, Socket.IO, and MongoDB to provide real-time communication between users, while ensuring secure data handling through JWT-based authentication.


## 🎯 Project Highlights

- 🔐 **Secure User Authentication** – JWT-based token system keeps your data safe.
- 👥 **Friend Management** – Add and remove friends with ease.
- 💬 **Real-Time Messaging** – Send and receive messages instantly using WebSockets.
- 🧑‍🤝‍🧑 **Group Chat** – Create group chats and enjoy dynamic conversations.

## 🛠️ Built With

- **Node.js** – The engine that powers the API logic.
- **Express.js** – Framework for building the RESTful endpoints.
- **MongoDB** – NoSQL database for storing users and chats.
- **Socket.IO** – Real-time communication with WebSockets.
- **Mongoose** – ODM for MongoDB.
- **JWT** – Authentication with JSON Web Tokens.
- **bcrypt** – Password hashing for security.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have:

- **Node.js** (v14+ recommended)
- **MongoDB** (Local or hosted on MongoDB Atlas)

### Installation Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/glovic/Chat-API.git
    cd Chat-API
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure your environment:**
    Create a `.env` file with the following values:
    ```
    MONGO_URI=mongodb://localhost:27017/chat-db
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

4. **Run the server:**
    ```bash
    npm start
    ```

5. The API will be up and running at `http://localhost:5000`! 🎉

---

## 📚 API Documentation

### Authentication Endpoints

- **Signup** – `POST /api/auth/signup`
    - Create a new user:
      ```json
      {
        "username": "john_doe",
        "email": "john@example.com",
        "password": "password123"
      }
      ```

- **Login** – `POST /api/auth/login`
    - Receive a JWT token for further requests:
      ```json
      {
        "email": "john@example.com",
        "password": "password123"
      }
      ```

### Friends Endpoints

- **Add Friend** – `POST /api/friends/add`
    - Add a friend using their user ID.
      ```json
      {
        "friendId": "userId123"
      }
      ```

- **Remove Friend** – `POST /api/friends/remove`
    - Remove a friend using their user ID.
      ```json
      {
        "friendId": "userId123"
      }
      ```

### Chat Endpoints

- **Send Message** (Socket.IO event)
    - Send a message to a friend in real time.
      ```json
      {
        "from": "userId123",
        "to": "userId456",
        "message": "Hello!"
      }
      ```

- **Receive Message** (Socket.IO event)
    - Listen for incoming messages in real time.


### Group Chat Endpoints

- **Create Group** – `POST /api/groups/create`
    - Create a new group chat:
      ```json
      {
        "name": "Cool Group",
        "members": ["userId123", "userId456"]
      }
      ```

- **Send Group Message** (Socket.IO event)
    - Send a message to a group:
      ```json
      {
        "groupId": "groupId123",
        "message": "Hey team!"
      }
      ```

---

## 🔄 Real-Time Communication with Socket.IO

This API leverages **Socket.IO** to facilitate instant messaging. Here’s how you can test the real-time features:

1. **Connect to WebSocket:**
    - Use a WebSocket client like **Socket.IO Client** or **WebSocket King**.
    - Connect to `ws://localhost:3000`.

2. **Send Message:**
    - Use the `send_message` event to send messages between users.

3. **Receive Message:**
    - Listen for the `receive_message` event to receive real-time messages.

---
