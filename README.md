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
    PORT=5000
    ```

4. **Run the server:**
    ```bash
    npm start
    ```

5. The API will be up and running at `http://localhost:5000`! 🎉

---

