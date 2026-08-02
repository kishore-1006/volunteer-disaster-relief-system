<div align="center">

# 🌍 Volunteer Disaster Relief System

### Empowering Communities Through Technology During Emergencies

A full-stack web application developed using **Spring Boot**, **React.js**, and **MySQL** to efficiently coordinate disaster response by managing volunteers, relief tasks, shelters, donations, and disaster information.

![Java](https://img.shields.io/badge/Java-21-red?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-success?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-8-blue?style=for-the-badge&logo=mysql)
![Git](https://img.shields.io/badge/Git-Version_Control-orange?style=for-the-badge&logo=git)
![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)

</div>

---

# 📖 Overview

The **Volunteer Disaster Relief System** is a centralized disaster management platform designed to improve emergency response by connecting administrators, volunteers, donors, and affected communities.

The platform helps organizations efficiently coordinate relief operations, assign volunteers, manage shelters, track donations, and monitor disasters through an intuitive web interface.

---

# 🎯 Objectives

- Improve disaster response efficiency
- Manage volunteers digitally
- Organize relief operations
- Track donations transparently
- Manage emergency shelters
- Provide centralized disaster information
- Reduce manual paperwork

---

# ✨ Core Features

### 👤 User Management
- User Registration
- Secure Login
- Profile Management
- Role-Based Access

### 🙋 Volunteer Management
- Volunteer Registration
- Skill Management
- Availability Tracking
- Task Assignment

### 🌪 Disaster Management
- Add Disaster Records
- Update Disaster Status
- Track Disaster Locations
- View Disaster Reports

### 🏠 Shelter Management
- Shelter Registration
- Capacity Monitoring
- Occupancy Tracking

### 💰 Donation Management
- Financial Donations
- Material Donations
- Donation History
- Donation Tracking

### 📋 Relief Task Management
- Create Tasks
- Assign Volunteers
- Update Progress
- Track Completion

### 📊 Admin Dashboard
- Dashboard Analytics
- User Management
- Volunteer Monitoring
- Disaster Reports

---

# 🏗 System Architecture

```text
                     React Frontend
                            │
                            ▼
                  Spring Boot REST API
                            │
      ┌─────────────────────┼─────────────────────┐
      ▼                     ▼                     ▼
 Service Layer       Security Layer        Repository Layer
                            │
                            ▼
                     MySQL Database
```

---

# 🛠 Technology Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React.js, HTML5, CSS3, JavaScript, Bootstrap |
| Backend | Java 21, Spring Boot, Spring Security, Spring Data JPA |
| Database | MySQL |
| Build Tool | Maven |
| IDE | Visual Studio Code |
| Version Control | Git & GitHub |
| Testing | Postman |

---

# 📂 Repository Structure

```text
volunteer-disaster-relief-system/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   └── .mvn/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docs/
├── README.md
├── LICENSE
├── CHANGELOG.md
├── .gitignore
└── .env.example
```

---

# 🗄 Database Modules

- User
- Volunteer
- Disaster
- Shelter
- Donation
- Task

---

# 🔄 Application Workflow

```text
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
```

---

# 🚀 Quick Start

### Clone Repository

```bash
git clone https://github.com/kishore-1006/volunteer-disaster-relief-system.git
```

### Backend

```bash
cd backend
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

# 📡 REST API Modules

- Authentication API
- User API
- Volunteer API
- Disaster API
- Shelter API
- Donation API
- Task API

---

# 📸 Screenshots

> Screenshots will be added after the project implementation is completed.

- Login Page
- Dashboard
- Volunteer Module
- Disaster Module
- Donation Module
- Shelter Module

---

# 🚀 Future Enhancements

- 🤖 AI-based Disaster Prediction
- 📍 Live GPS Volunteer Tracking
- 📱 Android Application
- ☁ Cloud Deployment
- 📧 Email Notifications
- 📲 SMS Alerts
- 🗺 GIS Map Integration
- 📊 Advanced Analytics Dashboard

---

# 📚 Documentation

- Software Requirements Specification (SRS)
- System Architecture
- UML Diagrams
- ER Diagram
- API Documentation
- User Manual

---

# 👨‍💻 Developer

**Kishore**

Bachelor of Engineering (Computer Science)

GitHub: **https://github.com/kishore-1006**

---

# 📄 License

This project is developed for academic and educational purposes only.

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a Star!

**Made with ❤️ using Spring Boot, React & MySQL**

</div>