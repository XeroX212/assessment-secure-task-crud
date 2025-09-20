# Secure Task Manager

A full-stack monorepo application built with **Nx**, **NestJS** (API), and **Angular** (Dashboard).  
Implements **secure task management** with **JWT authentication** and **role-based access control**.

---

## 🚀 Features

### 🔐 Authentication
- Register and login with JWT.
- Token stored in local storage, used via Angular interceptor.
- Roles: `Admin`, `Owner`, `Viewer`.

### ✅ Role-based Access
- **Admin** → view, create, edit, delete all tasks in the system.
- **Owner** → view, create, edit, delete only their own tasks.
- **Viewer** → view-only tasks assigned to them.

### 📋 Task Management
- Create, edit, delete tasks (respecting role rules).
- Tasks linked to `createdBy` and `assignee`.
- Tasks are filtered by role on backend.

### 🎨 Frontend (Angular + Tailwind)
- **Login / Register pages** styled with Tailwind.
- **Dashboard** with:
  - Task listing.
  - Add task form (only for Admin/Owner).
  - Edit / Delete actions (restricted to role).
- Responsive design.

### 🛡️ Backend (NestJS + TypeORM + SQLite)
- Secure API with `/api/auth` and `/api/tasks`.
- SQLite database (file: `db.sqlite`) for persistence.
- Guards and decorators for authenticated requests.

---

## 📂 Project Structure

```
secure-task-crud/
│── apps/
│   ├── api/             # NestJS backend
│   │   └── src/app/
│   │       ├── auth/    # Auth module (controller, service, user entity)
│   │       ├── task/    # Task module (controller, service, entity)
│   │       └── app.module.ts
│   └── dashboard/       # Angular frontend
│       └── src/app/
│           ├── pages/   # Login, Register, Dashboard
│           ├── services/# Auth + Task services
│           └── models/  # Shared models
│── db.sqlite            # SQLite database file
```

---

## 🛠️ Setup & Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Run API (NestJS)
```bash
npx nx serve api
```
App will run at:  
👉 http://localhost:3000/api  

### 3. Run Dashboard (Angular)
```bash
npx nx serve dashboard --host=0.0.0.0
```
App will run at:  
👉 http://localhost:4200  

### 4. Run Unit Tests
```bash
npx nx test api
```
✅ All unit tests should pass.

---

## 🧪 Testing Scenarios

### Register Users
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "password": "123", "role": "Admin"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "password": "123"}'
```

Response:
```json
{ "access_token": "..." }
```

### Authenticated Requests
```bash
curl http://localhost:3000/api/tasks \
  -H "Authorization: Bearer <token>"
```

---

## 🧩 Role Behavior

- **Admin**
  - Can create/edit/delete tasks.
  - Sees **all tasks**.
  - Can reassign tasks to other users.

- **Owner**
  - Can create tasks.
  - Can edit/delete only tasks they created.
  - Sees their created and assigned tasks.

- **Viewer**
  - Cannot create tasks.
  - Can only view tasks assigned to them.

---

## 🧪 Unit Tests

- **AuthService**
  - Register & login logic.
  - JWT signing/validation.

- **TaskService**
  - Create tasks with role validation.
  - Update/delete with permission checks.
  - Role-specific `findAllForUser`.

- **Controllers**
  - Ensure endpoints are defined and wired correctly.

Run:
```bash
npx nx test api
```

Output:
```
Test Suites: 6 passed, 6 total
Tests:       6 passed, 6 total
```

---

## ✅ Assessment Scope Completed

- Nx monorepo with Angular & NestJS.  
- JWT-based authentication.  
- Role-based access control.  
- CRUD for tasks with permissions.  
- Tailwind UI for login/register/dashboard.  
- Unit tests for services & controllers.  
- Documented with README.  

---

## 📌 Next Possible Improvements (Beyond 8h Scope)
- Add Organizations & 2-level hierarchy.  
- Add task assignment workflow (owners assigning to viewers).  
- Add e2e tests with Cypress.  
- Deploy to cloud.  

---

👨‍💻 Built as part of a technical assessment.  
Author: **Varun Chadha**