# Backend - Typing Speed Test App

This is the **backend service** for the Typing Speed Test application.  
It provides APIs for authentication, user management, typing test results, and database storage.

---

## 🚀 Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework for building APIs
- **MongoDB** – NoSQL database for storing users & results
- **Mongoose** – ODM for MongoDB
- **dotenv** – Manage environment variables
- **bcryptjs** – Password hashing for authentication
- **jsonwebtoken (JWT)** – User authentication & session handling
- **CORS** – Secure cross-origin requests

---

## 📂 Folder Structure

```yml

backend/
│-- src/
│ │-- config/ # Database connection & environment setup
│ │-- controllers/ # Request handlers (business logic)
│ │-- models/ # Mongoose schemas (User, Results, etc.)
│ │-- routes/ # Express route definitions
│ │-- middleware/ # Auth, error handlers
│ │-- utils/ # Helper functions
│ │-- server.js # Main entry point
│
│-- package.json
│-- README.md

```

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/DpkBhandari/Typing-test.git
cd Typing-test/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the `backend/` folder:

```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/typingtest
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
npm run dev
```

Server will start on:
👉 `http://localhost:5000`

---

## 🛠 API Endpoints

### 1. Register User

**POST** `/api/v1/register`

**Request Body:**

```json
{
  "name": "Deepak Channabasappa Bhandari",
  "email": "example123@gmail.com",
  "password": "Example123@"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "64f1234567890abcdef12345",
    "name": "Deepak Channabasappa Bhandari",
    "email": "example123@gmail.com"
  }
}
```

---

### 2. Login User

**POST** `/api/v1/login`

**Request Body:**

```json
{
  "email": "example123@gmail.com",
  "password": "Example123@"
}
```

**Response:**

```json
{
  "success": true,
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "64f1234567890abcdef12345",
    "name": "Deepak Channabasappa Bhandari",
    "email": "example123@gmail.com"
  }
}
```

---

### 3. Get Typing Results

**GET** `/api/results/:userId`
**Headers:**

```
Authorization: Bearer JWT_TOKEN_HERE
```

**Response:**

```json
{
  "success": true,
  "results": [
    {
      "wpm": 72,
      "cpm": 360,
      "accuracy": 95,
      "date": "2025-09-07T05:30:00.000Z"
    }
  ]
}
```

---

### 4. Save Typing Result

**POST** `/api/results`
**Headers:**

```
Authorization: Bearer JWT_TOKEN_HERE
```

**Request Body:**

```json
{
  "userId": "64f1234567890abcdef12345",
  "wpm": 72,
  "cpm": 360,
  "accuracy": 95
}
```

**Response:**

```json
{
  "success": true,
  "message": "Typing result saved successfully",
  "result": {
    "_id": "64f9876543210fedcba12345",
    "userId": "64f1234567890abcdef12345",
    "wpm": 72,
    "cpm": 360,
    "accuracy": 95,
    "date": "2025-09-07T05:30:00.000Z"
  }
}
```

---

## 🔧 Testing APIs (Postman / Insomnia)

1. Import backend URL into Postman.
2. Set `Content-Type: application/json` in headers.
3. For protected routes (`/api/results`), add `Authorization: Bearer <JWT_TOKEN>` in headers.
4. Use the request body samples above for testing.

---

## 👨‍💻 About Author

**Name : Deepak Channabasappa Bhandari**
<br>
**GitHub :** [DpkBhandari](https://github.com/DpkBhandari) <br>
**Mail :** [code2deepak@gmail.com](mailto:code2deepak@gmail.com)

---

## 📜 License

This project is licensed under the MIT License.

```pgsql


You can copy this entire content and save it as `README.md` in your `backend` folder.

If you want, I can also make a **slimmer “quick-start” version** for devs who just want to run the backend fast. Do you want me to do that too?



```
