# MicroCampus System Architecture

MicroCampus is an enterprise-grade academic administration platform designed with modular microservices, resilient data stores, and event-driven communication.

---

## 🏛️ High-Level System Architecture

```mermaid
graph TD
    Client["Client Web Application (React + TypeScript)"]
    Gateway["API Gateway / Reverse Proxy (Nginx / Spring Cloud Gateway)"]
    AuthService["Authentication & RBAC Service (Spring Boot + JWT)"]
    StudentService["Student Lifecycle Service (Spring Boot)"]
    ExamService["Examinations & Grading Service (Spring Boot)"]
    DB[(PostgreSQL Distributed Schemas)]
    Cache[(Redis Distributed Cache)]

    Client -->|HTTPS / REST| Gateway
    Gateway --> AuthService
    Gateway --> StudentService
    Gateway --> ExamService
    AuthService --> Cache
    AuthService --> DB
    StudentService --> DB
    ExamService --> DB
```

---

## 🔒 Security & RBAC Matrix

| Role | Access Scope | Authentication Mechanism |
| :--- | :--- | :--- |
| **Super Admin** | Full institutional controls & audit logs | JWT Bearer with MFA validation |
| **Faculty** | Course material, attendance, grading engine | JWT Bearer (Scoped permissions) |
| **Student** | Course registration, results, fee ledger | Session token + Refresh token |

---

## 🚀 Performance Benchmarks
- **Average API Response Time**: `< 65ms`
- **Database Query Latency**: `< 12ms` (95th percentile with indexing)
- **Cache Hit Ratio**: `> 91%` via Redis Cluster

---

## 📄 License
Licensed under the [MIT License](../LICENSE).
