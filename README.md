<div align="center">

# 🎓 MicroCampus API

### Scalable Campus Management & Academic LMS RESTful Microservices

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.22-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Security-JWT_&_Bcrypt-FFB13B?style=for-the-badge&logo=jsonwebtokens&logoColor=black)](https://jwt.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

<br/>

<p align="center">
  <b>MicroCampus</b> is a modular, production-ready backend service designed to power modern university portals, digital campus administrative workflows, and interactive learning management systems.
</p>

[Explore API Docs](#-api-endpoints-reference) • [Quick Start](#-quick-start) • [Postman Collection](#-postman-api-suite) • [Architecture](#-architecture--request-flow)

</div>

---

## ⚡ Key Highlights & Core Modules

* **🔐 Authentication & RBAC**: Granular Role-Based Access Control (Admin, Faculty, Student) secured with JWT tokens and Bcrypt hashing.
* **📚 Course & Syllabus Engine**: Complete curriculum tracking, subject scheduling, and student enrollment pipelines.
* **📝 Notes & Document Distribution**: Secure academic file uploading and resource sharing powered by Multer.
* **📢 Digital Noticeboard**: Campus-wide broadcasts, emergency alerts, and department bulletins with date filtering.
* **🧠 Assessment & Quiz Suite**: Automated student evaluation module with real-time scoring and submission tracking.
* **📦 Postman Integration**: Out-of-the-box Postman Collection and Environment files for rapid API testing.

---

## 🏗️ Architecture & Request Flow

```
                      ┌────────────────────────────┐
                      │    Client / Frontend       │
                      │  (React / Web / Mobile)    │
                      └─────────────┬──────────────┘
                                    │ HTTP / REST
                                    ▼
                      ┌────────────────────────────┐
                      │    Express Router (TS)     │
                      └─────────────┬──────────────┘
                                    │
             ┌──────────────────────┴──────────────────────┐
             ▼                                             ▼
┌─────────────────────────┐                   ┌─────────────────────────┐
│     JWT Auth & RBAC     │                   │   Multer File Upload    │
│       Middleware        │                   │       Middleware        │
└────────────┬────────────┘                   └────────────┬────────────┘
             │                                             │
             └──────────────────────┬──────────────────────┘
                                    │ Validated Requests
                                    ▼
                      ┌────────────────────────────┐
                      │    Controllers & Logic     │
                      │ (Auth, Course, Quiz, etc.) │
                      └─────────────┬──────────────┘
                                    │ Mongoose ORM
                                    ▼
                      ┌────────────────────────────┐
                      │    MongoDB Cloud / Local   │
                      └────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
* [Node.js (v18+)](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/) running locally or a [MongoDB Atlas](https://www.mongodb.com/atlas) URI

### 1. Clone the Repository
```bash
git clone https://github.com/Gaurav-Khaladkar/MicroCampus.git
cd MicroCampus/microcampus-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your configuration:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/microcampus
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
```

### 4. Seed Database (Optional)
Populate initial demo data (admin, sample courses, and quizzes):
```bash
npm run seed
```

### 5. Start the Server
* **Development Mode** (with hot reload):
  ```bash
  npm run dev
  ```
* **Production Build**:
  ```bash
  npm run build
  npm start
  ```
* The API will be live at `http://localhost:5000`.

---

## 📡 API Endpoints Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new student or faculty account |
| `POST` | `/api/auth/login` | Public | Authenticate credentials and receive JWT |

### 🛡️ Admin Management (`/api/admin`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/users` | Admin | Fetch directory of all registered users |
| `PATCH`| `/api/admin/role/:id` | Admin | Escalate or update user RBAC role |

### 📚 Course Operations (`/api/courses`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/courses` | Authenticated | List all active courses |
| `POST` | `/api/courses` | Faculty/Admin | Create a new academic course module |
| `GET` | `/api/courses/:id` | Authenticated | Retrieve syllabus and course details |

### 📝 Academic Notes & Uploads (`/api/notes`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/notes` | Authenticated | List study notes and downloadable guides |
| `POST` | `/api/notes/upload` | Faculty | Upload lecture notes (PDF/Docs via Multer) |

### 📢 Digital Notices (`/api/notices`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/notices` | Public/Auth | Fetch all campus notices and events |
| `POST` | `/api/notices` | Faculty/Admin | Publish a campus-wide notification |

### 🧠 Quiz Engine (`/api/quizzes`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/quizzes` | Students | Fetch available academic quizzes |
| `POST` | `/api/quizzes/submit` | Students | Submit answers and calculate score |

---

## 📮 Postman API Suite

A full test suite is included directly within the repository:
1. Open **Postman**.
2. Click **Import** and select:
   * [`microcampus-backend/microcampus_collection.json`](./microcampus-backend/microcampus_collection.json)
   * [`microcampus-backend/microcampus_environment.json`](./microcampus-backend/microcampus_environment.json)
3. Run the collection to test all endpoints end-to-end.

---

## 📁 Repository Structure

```text
MicroCampus/
└── microcampus-backend/
    ├── src/
    │   ├── config/          # Database connection & environment configuration
    │   ├── controllers/     # Request handling & business logic
    │   ├── middleware/      # JWT auth guard, role-based checks, file upload
    │   ├── models/          # Mongoose database schemas
    │   ├── routes/          # Express route definitions
    │   ├── scripts/         # Database seed scripts
    │   ├── utils/           # Helper utilities and token generators
    │   └── server.ts        # Express application entrypoint
    ├── microcampus_collection.json   # Postman API Collection
    ├── microcampus_environment.json  # Postman Environment Variables
    ├── package.json
    └── tsconfig.json
```

---

## 👨‍💻 Author

**Gaurav Khaladkar**
* 🌐 GitHub: [@Gaurav-Khaladkar](https://github.com/Gaurav-Khaladkar)
* 💼 LinkedIn: [Gaurav Khaladkar](https://www.linkedin.com/in/gaurav-khaladkar/)
* 📧 Email: [gauravkhaldkar2001@gmail.com](mailto:gauravkhaldkar2001@gmail.com)

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
