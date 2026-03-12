# CivicSense (StreetVoice) 🏙️

CivicSense is a modern, full-stack web application designed to empower citizens to report, track, and resolve local infrastructure issues directly with their municipality. 

Built with a robust **Java Spring Boot** backend and a lightning-fast **React + Vite** frontend, CivicSense features secure role-based access control, real-time community upvoting, and an interactive feed for transparent urban governance.

---

## ✨ Features

- **Secure Authentication:** JWT-based stateless authentication with password encryption (BCrypt).
- **Role-Based Authorization:** Distinct privileges for `ROLE_CITIZEN` (reporting/upvoting) and `ROLE_ADMIN` (managing and resolving issues).
- **Issue Reporting:** Citizens can instantly report local issues (e.g., potholes, broken streetlights) with detailed descriptions and locations.
- **Community Upvoting:** Democratized prioritization system allowing users to upvote critical infrastructure problems (restricted to one vote per user per issue).
- **Interactive Dashboard:** Dynamic, filterable feed displaying the real-time status of reported issues (`OPEN`, `IN_PROGRESS`, `RESOLVED`).
- **Modern UI/UX:** Responsive, stunning interface built natively with Tailwind CSS v4 and Lucide React icons.
- **RESTful API:** Fully documented backend endpoints leveraging OpenAPI/Swagger UI.
- **Robust Error Handling:** Standardized global exception reporting across the entire API environment.

---

## 🛠️ Technology Stack

### Backend
- **Framework:** Java 17, Spring Boot 3
- **Database:** PostgreSQL, Spring Data JPA, Hibernate
- **Security:** Spring Security, JSON Web Tokens (JJWT)
- **Validation:** Spring Boot Starter Validation
- **Documentation:** Springdoc OpenAPI (Swagger UI)
- **Utilities:** Lombok

### Frontend
- **Framework:** React 18, Vite
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **API Client:** Axios (with dynamic Request Interceptors)
- **Icons:** Lucide React
- **Time Formatting:** Date-fns

---
## 🏗️ Architecture

```
+----------------------+
|      Frontend        |
|    React + Vite      |
|   Tailwind CSS       |
+----------+-----------+
           |
           |  HTTP / REST API
           v
+----------------------+
|       Backend        |
|     Spring Boot      |
|  Spring Security     |
|       JWT Auth       |
+----------+-----------+
           |
           |  JPA / Hibernate
           v
+----------------------+
|       Database       |
|      PostgreSQL      |
+----------------------+
```


## 🚀 Getting Started

### Prerequisites
- **Java 17** or higher
- **Node.js 18+** and npm
- **PostgreSQL** running locally on port `5432`
- **Maven** (optional if using the included wrapper)

### 1. Database Setup
Ensure PostgreSQL is running. The application is configured to automatically create the database schema.
You may need to manually create the empty database first depending on your Postgres configuration:
```sql
CREATE DATABASE "civicReport_db";
```

### 2. Backend Setup
Navigate to the `backend` directory and start the Spring Boot server.

```bash
cd backend
mvn spring-boot:run
```
*The backend will boot up on `http://localhost:8080`.*

**API Documentation:** Once the backend is running, access the interactive Swagger UI at:
`http://localhost:8080/swagger-ui/index.html`

### 3. Frontend Setup
Open a new terminal, navigate to the `frontend` directory, install dependencies, and start the Vite development server.

```bash
cd frontend
npm install
npm run dev
```
*The frontend will boot up and automatically proxy API requests to the backend.*

---

## 🔐 Simulating the Admin Experience
By default, the backend registers all new accounts as a `ROLE_CITIZEN`. To test the `ROLE_ADMIN` features (which unlocks the "Mark In Progress" and "Mark Resolved" buttons):

1. Register a new account via the frontend UI.
2. Open your PostgreSQL client (pgAdmin, DBeaver, or psql) and execute the following:
   ```sql
   UPDATE users SET role = 'ROLE_ADMIN' WHERE email = 'your_registered_email@example.com';
   ```
3. Sign out of your current session on the frontend and log back in. Your new JWT token will automatically unlock the Admin capabilities.

---

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
