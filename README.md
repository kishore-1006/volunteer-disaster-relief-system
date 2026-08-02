<div align="center">

# 🌍 Volunteer Disaster Relief System

### 🚑 Empowering Communities Through Smart Disaster Management

<p align="center">
  <img src="https://img.shields.io/badge/Java-21-red?style=for-the-badge&logo=openjdk">
  <img src="https://img.shields.io/badge/Spring_Boot-3.x-success?style=for-the-badge&logo=springboot">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/MySQL-8-blue?style=for-the-badge&logo=mysql">
  <img src="https://img.shields.io/badge/Maven-Build-orange?style=for-the-badge&logo=apachemaven">
  <img src="https://img.shields.io/badge/Git-Version_Control-F05032?style=for-the-badge&logo=git">
  <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github">
</p>

---

## 🌟 Project Overview

The **Volunteer Disaster Relief System** is a modern full-stack web application developed to simplify disaster management by connecting **administrators**, **volunteers**, **donors**, **shelter coordinators**, and **affected people** through one centralized platform.

This project enables organizations to coordinate rescue operations efficiently, manage volunteers, allocate shelters, monitor donations, and provide real-time disaster information.

---

## 🎯 Problem Statement

Natural disasters often create communication gaps between volunteers, relief organizations, and affected communities. Traditional manual processes delay rescue operations and resource allocation.

The Volunteer Disaster Relief System provides a digital platform to streamline disaster response by managing volunteers, shelters, donations, relief tasks, and disaster records in one secure application.

---

# 🎯 Objectives

- Improve disaster response efficiency
- Digitize volunteer management
- Manage shelters effectively
- Allocate relief tasks quickly
- Track donations transparently
- Provide centralized disaster information
- Reduce paperwork
- Improve coordination among all stakeholders

---

# ✨ Core Features

## 👤 User Module

- User Registration
- Secure Login
- JWT Authentication
- Profile Management
- Change Password
- Role-Based Access

---

## 🙋 Volunteer Module

- Volunteer Registration
- Skill Management
- Availability Status
- Assign Relief Tasks
- View Assigned Tasks
- Volunteer Reports

---

## 🌪 Disaster Module

- Add Disaster Information
- Update Disaster Status
- Disaster Location
- Disaster Severity
- Disaster Reports
- Emergency Notifications

---

## 🏠 Shelter Module

- Register Shelter
- Capacity Management
- Shelter Availability
- Occupancy Tracking
- Shelter Allocation

---

## 💰 Donation Module

- Monetary Donations
- Material Donations
- Donation Tracking
- Donation History
- Donation Reports

---

## 📋 Relief Task Module

- Create Tasks
- Assign Volunteers
- Track Task Status
- Update Task Progress
- Completion Reports

---

## 👨‍💼 Admin Dashboard

- Dashboard Analytics
- User Management
- Volunteer Management
- Disaster Management
- Donation Monitoring
- Shelter Monitoring
- Reports & Analytics

---

# 🛠 Technology Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React.js, HTML5, CSS3, JavaScript, Bootstrap |
| Backend | Java 21, Spring Boot, Spring Security, Spring Data JPA |
| Database | MySQL |
| Build Tool | Maven |
| IDE | Visual Studio Code |
| API Testing | Postman |
| Version Control | Git & GitHub |

---

# 📂 Project Modules

✅ User Management

✅ Volunteer Management

✅ Disaster Management

✅ Shelter Management

✅ Donation Management

✅ Task Management

✅ Admin Dashboard

---

# ⭐ Highlights

- Modern REST API Architecture
- Responsive UI
- Secure Authentication
- MySQL Database Integration
- Clean Layered Architecture
- Scalable Design
- Easy Deployment
- Academic Project Ready

---

# 🏗 System Architecture

```text
                               +----------------------+
                               |    Web Browser       |
                               |   (React Frontend)   |
                               +----------+-----------+
                                          |
                                          | HTTP / HTTPS
                                          ▼
                              +-------------------------+
                              |    Spring Boot API      |
                              |-------------------------|
                              | Authentication          |
                              | User Module             |
                              | Volunteer Module        |
                              | Disaster Module         |
                              | Shelter Module          |
                              | Donation Module         |
                              | Task Module             |
                              +-----------+-------------+
                                          |
                             Spring Data JPA / Hibernate
                                          |
                                          ▼
                              +-------------------------+
                              |     MySQL Database      |
                              +-------------------------+
```

---

# 📘 UML Class Diagram

```text
+--------------------------------------------------+
|                     User                         |
+--------------------------------------------------+
| - userId : Long                                 |
| - fullName : String                             |
| - email : String                                |
| - password : String                             |
| - phone : String                                |
| - role : String                                 |
+--------------------------------------------------+

                    1
                    |
                    | has
                    |
                    *
+--------------------------------------------------+
|                  Volunteer                      |
+--------------------------------------------------+
| - volunteerId : Long                            |
| - skills : String                               |
| - availability : Boolean                        |
| - location : String                             |
+--------------------------------------------------+

                    |
                    | assigned
                    |
                    *
+--------------------------------------------------+
|                     Task                         |
+--------------------------------------------------+
| - taskId : Long                                 |
| - title : String                                |
| - description : String                          |
| - status : String                               |
| - assignedDate : Date                           |
+--------------------------------------------------+

                    ^
                    |
                    |
                    |
+--------------------------------------------------+
|                  Disaster                        |
+--------------------------------------------------+
| - disasterId : Long                             |
| - title : String                                |
| - location : String                             |
| - type : String                                 |
| - severity : String                             |
| - status : String                               |
+--------------------------------------------------+

                    |
                    |
                    |
        +-----------+------------+
        |                        |
        ▼                        ▼

+--------------------+    +--------------------+
|      Shelter       |    |     Donation       |
+--------------------+    +--------------------+
| shelterId          |    | donationId         |
| name               |    | amount             |
| address            |    | donorName          |
| capacity           |    | donationType       |
+--------------------+    +--------------------+
```

---

# 🗄 ER Diagram

```text
USER
--------------------------
PK user_id
name
email
password
phone
role
          |
          |1
          |
          |------< VOLUNTEER
                  PK volunteer_id
                  skills
                  availability
                  location
                  FK user_id

VOLUNTEER
        |
        |1
        |
        |------< TASK
                PK task_id
                title
                description
                status
                FK volunteer_id
                FK disaster_id

DISASTER
-------------------------
PK disaster_id
title
location
type
severity
status

DISASTER
      |
      |1
      |
      |------< SHELTER
      |        PK shelter_id
      |        name
      |        address
      |        capacity
      |
      |------< DONATION
               PK donation_id
               donor_name
               amount
               donation_type
               FK disaster_id
```

---

# 👥 Use Case Diagram

```text
                    +-------------------+
                    |      Admin        |
                    +---------+---------+
                              |
         --------------------------------------------
         |         |         |         |            |
         ▼         ▼         ▼         ▼            ▼
 Manage Users  Manage   Manage     Manage      View Reports
               Disaster Volunteers Donations

                    +-------------------+
                    |    Volunteer      |
                    +---------+---------+
                              |
                ----------------------------
                |             |            |
                ▼             ▼            ▼
          Update Profile  View Tasks  Update Status

                    +-------------------+
                    |      Donor        |
                    +---------+---------+
                              |
                      ----------------
                      |              |
                      ▼              ▼
               Donate Money    Donate Items
```

---

# 🔄 Sequence Diagram

```text
User
 |
 | Login
 ▼
Frontend
 |
 | API Request
 ▼
Spring Boot
 |
 | Validate User
 ▼
Database
 |
 | User Found
 ▼
Spring Boot
 |
 | JWT Token
 ▼
Frontend
 |
 | Dashboard
 ▼
User
```

---

# 📈 Activity Diagram

```text
Start
   |
   ▼
User Login
   |
   ▼
Authentication
   |
   ├── Invalid Credentials
   |        |
   |        ▼
   |    Show Error
   |
   ▼
Login Success
   |
   ▼
Dashboard
   |
   ▼
Select Module
   |
   ├── Volunteer
   ├── Disaster
   ├── Shelter
   ├── Donation
   └── Task
   |
   ▼
Save Data
   |
   ▼
Database Updated
   |
   ▼
End
```

---

# 🔄 Project Workflow

```text
User Registration
        │
        ▼
User Login
        │
        ▼
Dashboard
        │
        ▼
Manage Disaster Information
        │
        ▼
Register Volunteers
        │
        ▼
Assign Relief Tasks
        │
        ▼
Manage Shelters
        │
        ▼
Track Donations
        │
        ▼
Generate Reports
        │
        ▼
Logout
```

---

# 📂 Repository Structure

```text
volunteer-disaster-relief-system/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── volunteer/
│   │   │   │           ├── controller/
│   │   │   │           ├── service/
│   │   │   │           ├── repository/
│   │   │   │           ├── entity/
│   │   │   │           ├── dto/
│   │   │   │           ├── security/
│   │   │   │           ├── exception/
│   │   │   │           └── config/
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── static/
│   │   │
│   │   └── test/
│   │
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── assets/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── UML/
│   ├── ER/
│   ├── API/
│   └── Images/
│
├── README.md
├── LICENSE
├── CHANGELOG.md
├── .gitignore
└── .env.example
```

---

# 🗃 Database Tables

| Table | Description |
|--------|-------------|
| Users | Stores all user information |
| Volunteers | Volunteer details |
| Disasters | Disaster records |
| Shelters | Shelter information |
| Donations | Donation records |
| Tasks | Relief task assignments |

---

# 🔑 Database Relationships

- One User ➜ One Volunteer Profile
- One Disaster ➜ Many Shelters
- One Disaster ➜ Many Donations
- One Volunteer ➜ Many Tasks
- One Disaster ➜ Many Tasks

---

# 📡 REST API Endpoints

## Authentication

| Method | Endpoint |
|----------|----------------------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/logout |

---

## User APIs

| Method | Endpoint |
|----------|----------------|
| GET | /api/users |
| GET | /api/users/{id} |
| PUT | /api/users/{id} |
| DELETE | /api/users/{id} |

---

## Volunteer APIs

| Method | Endpoint |
|----------|--------------------------|
| GET | /api/volunteers |
| POST | /api/volunteers |
| PUT | /api/volunteers/{id} |
| DELETE | /api/volunteers/{id} |

---

## Disaster APIs

| Method | Endpoint |
|----------|------------------------|
| GET | /api/disasters |
| POST | /api/disasters |
| PUT | /api/disasters/{id} |
| DELETE | /api/disasters/{id} |

---

## Shelter APIs

| Method | Endpoint |
|----------|----------------------|
| GET | /api/shelters |
| POST | /api/shelters |
| PUT | /api/shelters/{id} |
| DELETE | /api/shelters/{id} |

---

## Donation APIs

| Method | Endpoint |
|----------|----------------------|
| GET | /api/donations |
| POST | /api/donations |
| PUT | /api/donations/{id} |
| DELETE | /api/donations/{id} |

---

## Task APIs

| Method | Endpoint |
|----------|----------------|
| GET | /api/tasks |
| POST | /api/tasks |
| PUT | /api/tasks/{id} |
| DELETE | /api/tasks/{id} |

---

# 🚀 Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/kishore-1006/volunteer-disaster-relief-system.git
```

---

## 2️⃣ Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 4️⃣ Database Setup

```sql
CREATE DATABASE volunteer_disaster_relief;
```

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/volunteer_disaster_relief
spring.datasource.username=root
spring.datasource.password=your_password
```

---

# ⚙ Configuration

Backend Port

```
8080
```

Frontend Port

```
5173
```

Database

```
MySQL 8.0
```

Java Version

```
Java 21
```

Spring Boot

```
3.x
```

---

# 🧪 Testing Tools

- ✅ Postman
- ✅ MySQL Workbench
- ✅ Chrome DevTools
- ✅ JUnit
- ✅ Mockito

---

# ☁ Deployment (Future)

- AWS EC2
- Docker
- Railway
- Render
- Vercel
- Netlify

---

# 📸 Project Screenshots

> Screenshots will be updated after project implementation.

## 🔐 Login Page

<p align="center">
<img src="docs/images/login.png" width="900">
</p>

---

## 📊 Admin Dashboard

<p align="center">
<img src="docs/images/dashboard.png" width="900">
</p>

---

## 🙋 Volunteer Management

<p align="center">
<img src="docs/images/volunteer.png" width="900">
</p>

---

## 🌪 Disaster Management

<p align="center">
<img src="docs/images/disaster.png" width="900">
</p>

---

## 🏠 Shelter Management

<p align="center">
<img src="docs/images/shelter.png" width="900">
</p>

---

## 💰 Donation Management

<p align="center">
<img src="docs/images/donation.png" width="900">
</p>

---

# 📚 Project Documentation

This project includes the following documentation:

- ✅ Software Requirements Specification (SRS)
- ✅ Software Design Document (SDD)
- ✅ UML Class Diagram
- ✅ ER Diagram
- ✅ Use Case Diagram
- ✅ Sequence Diagram
- ✅ Activity Diagram
- ✅ System Architecture
- ✅ Database Schema
- ✅ REST API Documentation
- ✅ User Manual
- ✅ Installation Guide

---

# 📈 Project Progress

| Module | Status |
|----------|--------|
| Project Setup | ✅ Completed |
| Backend Development | 🚧 In Progress |
| Frontend Development | 🚧 In Progress |
| Database Design | 🚧 In Progress |
| REST API | ⏳ Pending |
| Authentication | ⏳ Pending |
| Deployment | ⏳ Pending |
| Documentation | 🚧 In Progress |

---

# 🚀 Future Enhancements

- 🤖 AI-based Disaster Prediction
- 📍 Live Volunteer GPS Tracking
- 📱 Android Mobile Application
- ☁ Cloud Deployment (AWS)
- 📧 Email Notifications
- 📲 SMS Alerts
- 🗺 Interactive GIS Maps
- 📊 Advanced Analytics Dashboard
- 🌐 Multi-language Support
- 🔔 Real-time Notifications
- 📦 Inventory Management
- 🤝 NGO Collaboration Portal

---

# 🔒 Security Features

- JWT Authentication
- Password Encryption
- Role-Based Authorization
- Secure REST APIs
- Input Validation
- Exception Handling
- SQL Injection Prevention
- CORS Configuration

---

# 📋 Software Requirements

## Hardware

- Processor : Intel i3 or Above
- RAM : 8 GB Recommended
- Storage : 20 GB Free Space

## Software

- Java 21
- Spring Boot 3.x
- React.js
- MySQL 8
- Maven
- Git
- Visual Studio Code
- MySQL Workbench
- Postman

---

# 🤝 Contribution

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push your branch
5. Create a Pull Request

---

# 👨‍💻 Developer

## **Kishore**

Bachelor of Engineering (Computer Science)

### Skills

- Java
- Spring Boot
- React.js
- MySQL
- REST API
- Git & GitHub

GitHub

https://github.com/kishore-1006

---

# 📄 License

This project is developed for educational and academic purposes.

---

# 🙏 Acknowledgements

Special thanks to

- Faculty Members
- Open Source Community
- Spring Boot Team
- React Team
- MySQL Team

---

<div align="center">

# ⭐ If you like this project, don't forget to Star this Repository ⭐

---

## ❤️ Made with Passion using

Java • Spring Boot • React • MySQL • Git • GitHub

---

### 🌍 Volunteer Disaster Relief System

**Helping Communities Through Technology**

🚀 Developed with dedication by **Kishore**

</div>