# SensorSync: Design and Development of a Web Interface for a Real-Time Sensor Analytics and Reporting System

<img width="731" height="331" alt="image" src="https://github.com/user-attachments/assets/ab211ef9-31fc-46da-97e5-241baf71bb75" />


**A comprehensive, institution-grade platform for real-time environmental monitoring, secure data validation, and advanced analytics. Developed at the Council of Scientific and Industrial Research - National Physical Laboratory (CSIR-NPL).**

---

## 📖 Table of Contents
- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [✨ Key Features](#-key-features)
- [🛠️ Technical Stack](#️-technical-stack)
- [🏗️ System Architecture](#️-system-architecture)
- [🔒 Security Features](#-security-features)
- [📸 UI Walkthrough & Screenshots](#-ui-walkthrough--screenshots)
- [📂 Project Structure](#-project-structure)
- [🧠 Challenges and Lessons Learned](#-challenges-and-lessons-learned)
- [🚀 Future Scope](#-future-scope)
- [👥 Authors & Acknowledgments](#-authors--acknowledgments)

---

## 🌐 Overview

**SensorSync** is a full-stack, web-based platform designed to monitor environmental conditions like temperature and humidity in real-time. It addresses the critical need in scientific and research institutions for a system that not only provides live data but also ensures data integrity, security, and traceability.

The project bridges the gap between raw sensor data and meaningful, verified insights. It provides a complete end-to-end pipeline—from sensor data collection and secure transmission to centralized storage, real-time visualization, historical analysis, and verifiable report generation. The system is built from the ground up with a focus on usability, modularity, and robust security, eliminating reliance on third-party commercial platforms and giving institutions full control over their data infrastructure.

## 🎯 Problem Statement

In scientific settings like CSIR-NPL, environmental monitoring systems are crucial for research, calibration, and safety. However, existing solutions often lack the transparency, full-stack control, and rigorous data validation required for institutional use. Commercial platforms can be black boxes, and custom solutions are often underdeveloped, missing key features like secure multi-user access, real-time fault detection, and auditable data trails.

SensorSync was initiated to address this gap by developing a modular, institution-grade dashboard that supports:
-   Seamless environmental data acquisition.
-   Centralized, secure storage.
-   User-centric visualization and analytics.
-   Strict authentication protocols.
-   Trustworthy, verifiable data exports.

## ✨ Key Features

SensorSync is packed with features designed for robust monitoring and data management:

#### 1. **Secure Authentication & Role-Based Access (RBAC)**
-   **User Authentication:** Secure login, registration, and password recovery.
-   **Custom CAPTCHA:** An in-house, accessible CAPTCHA system to prevent automated registrations.
-   **Role-Based Access:** Two distinct roles (**Standard User** and **Administrator**) with different permissions. Admins have access to user management, sensor configuration, and system-wide settings.

#### 2. **Real-Time Monitoring Dashboard**
-   **Live Data Feeds:** Dashboard cards display the latest temperature and humidity readings, auto-refreshing every few seconds.
-   **Dynamic Charts:** Live-updating line, bar, and area charts for visualizing real-time environmental trends for each sensor.
-   **Sensor Selection:** Easily switch between different sensors to monitor specific locations.

#### 3. **Historical Data & Reporting**
-   **Date Range Filtering:** Query and visualize historical data by selecting specific date ranges.
-   **Tabular & Graphical Views:** View historical data in both a paginated table and interactive charts.
-   **Secure Report Generation:** Download filtered data as an **Excel (.xlsx)** file for offline analysis or archiving.

#### 4. **Cryptographic Data Validation**
-   **Hash-Based Integrity:** Each downloaded report is accompanied by a metadata file containing a **SHA-256 hash** of its contents.
-   **Verification Module:** A dedicated page allows users to upload a report to verify its authenticity. The system re-computes the hash and compares it to the original, instantly detecting any tampering or corruption.

#### 5. **Advanced Analytics & Visualization**
-   **Geospatial Map View:** A map displays the geographical location of all deployed sensors, with color-coded markers (Green for Active, Red for Inactive) indicating their real-time status.
-   **Statistical Analysis:** An analysis page provides key statistics for any selected day, including min/max values, average, variance, and rate of change for temperature and humidity.

#### 6. **Comprehensive Admin Controls**
-   **User Management:** Admins can add, edit, delete, and manage user roles through a centralized interface.
-   **Sensor Management:** Admins can register new sensors, edit their metadata (e.g., model, accuracy, location), and view detailed information for all sensors in the network.
-   **Sensor Fault Detection:** The system automatically monitors sensor activity and flags any sensor that becomes inactive, alerting administrators on the dashboard and map.

#### 7. **Secure Profile Management**
-   **OTP Verification:** User profile updates (like changing an email address) are secured with a One-Time Password (OTP) sent to the user's registered email, preventing unauthorized changes.

---

## 🛠️ Technical Stack

The platform is built using a modern, robust, and scalable tech stack.

| Layer                 | Technologies & Tools                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------- |
| **Frontend** | **React.js**, Vite, JavaScript (ES6+), JSX                                                  |
| **UI Library** | **Material-UI (MUI)** for responsive and consistent components.                             |
| **Charting** | **Recharts** for dynamic and interactive data visualizations.                               |
| **Backend & Database**| **Supabase** (PostgreSQL with Real-time capabilities)                                       |
| **Authentication** | **Supabase Auth** (JWT-based), Custom OTP verification.                                     |
| **Custom Backend Logic** | **PHP** for OTP generation, Excel report creation, and SHA-256 hashing.                    |
| **State Management** | React Hooks (`useState`, `useEffect`, `useContext`).                                        |
| **API Communication** | Native **Fetch API** with Async/Await.                                                      |
| **Version Control** | Git & GitHub.                                                                               |

---

## 🏗️ System Architecture

SensorSync uses a decoupled architecture where the frontend (React) communicates with a backend powered by Supabase and custom PHP scripts.

1.  **Sensors:** Physical sensors collect temperature and humidity data.
2.  **Data Ingestion:** Data is sent to a central **PostgreSQL** database managed by **Supabase**.
3.  **Backend Logic:**
    -   **Supabase** handles core database operations, real-time data streaming, and user authentication (issuing JWTs).
    -   **PHP scripts** handle specialized tasks like sending OTP emails, generating hashed Excel reports, and creating metadata files.
4.  **Frontend (React):**
    -   The single-page application built with React consumes data from the backend.
    -   It uses Supabase's real-time subscription to update the dashboard live.
    -   All user interactions, from viewing data to managing users, are handled through the React UI.
5.  **User Interaction:** Users log in, view dashboards, query data, and download reports. Admins access additional management panels.

![System Flow Diagram](https://i.imgur.com/vHqC6eW.png)

---

## 🔒 Security Features

Security was a top priority throughout the development of SensorSync.

-   **JWT-Based Authentication:** Secure session management using JSON Web Tokens provided by Supabase Auth.
-   **Role-Based Access Control (RBAC):** Strictly enforces user roles (admin vs. user) to protect sensitive functionalities.
-   **Custom CAPTCHA:** Prevents automated bots from creating accounts.
-   **OTP for Profile Updates:** Secures changes to critical user information like email addresses.
-   **Cryptographic Hash Validation:** Guarantees the integrity and authenticity of all downloaded data reports using SHA-256 hashing.
-   **Protected Routes:** Frontend routes are protected, redirecting unauthenticated users to the login page.
-   **Input Validation:** Both client-side and server-side validation to prevent malicious data entry.

---

## 📸 UI Walkthrough & Screenshots

#### 1. Authentication
The landing page provides secure login, registration, and password recovery options, protected by a custom CAPTCHA.

*(Placeholder for Login Page Screenshot)*

#### 2. Dashboard
After login, the user is greeted with a clean dashboard showing the most recent readings from all active sensors.

*(Placeholder for Dashboard Screenshot)*

#### 3. Real-Time View
This page offers live-updating graphs, allowing users to monitor environmental conditions as they happen.

*(Placeholder for Real-Time Page Screenshot)*

#### 4. History & Report
Users can query historical data, view it in tables and graphs, and download secure, verifiable Excel reports.

*(Placeholder for History & Report Page Screenshot)*

#### 5. Data Validation
A simple drag-and-drop interface to upload and verify the authenticity of downloaded reports.

*(Placeholder for Data Validation Page Screenshot)*

#### 6. Admin Panels (User & Sensor Management)
Admins have access to powerful tools to manage users and sensor metadata from a centralized interface.

*(Placeholder for User Management Screenshot)*

---

## 📂 Project Structure

The frontend codebase is organized for modularity and scalability using Vite and React.

```
/frontend
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/      # Reusable React components (e.g., Charts, Modals)
│   ├── contexts/        # React Context for global state management
│   ├── pages/           # Page-level components
│   │   ├── admin/       # Admin-only pages (UserManagement, SensorManagement)
│   │   ├── Dashboard.jsx
│   │   ├── RealTime.jsx
│   │   └── ...
│   ├── App.css
│   ├── App.jsx          # Main component with routing setup
│   ├── main.jsx         # Application entry point
│   └── index.css
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🧠 Challenges and Lessons Learned

-   **Real-Time Data Integrity:** Ensuring a consistent and reliable data flow from physical sensors was a major challenge. We implemented fault-detection logic to handle network disruptions and flag inactive sensors.
-   **Secure OTP Implementation:** Building a secure and user-friendly OTP system required careful handling of asynchronous operations, token expiry, and prevention of bypass attempts.
-   **Performance Optimization:** Maintaining a responsive UI with continuously updating charts required optimizing data streams and component rendering to prevent performance bottlenecks.
-   **Team Collaboration:** Coordinating between teams working on hardware, backend, and frontend required strong version control practices (Git) and clear communication to keep schemas and APIs in sync.

---

## 🚀 Future Scope

SensorSync is a strong foundation with vast potential for future enhancements:
-   **Mobile Application:** A dedicated mobile app for on-the-go monitoring, push notifications for alerts, and offline capabilities.
-   **AI & Predictive Analytics:** Integrate machine learning models (e.g., LSTM) for time-series forecasting to predict environmental changes and detect anomalies.
-   **Self-Healing Data Module:** A system to automatically identify and interpolate missing data points caused by sensor faults, with confidence scores for transparency.
-   **Expanded Sensor Support:** Add support for a wider range of environmental parameters (e.g., air pressure, CO2, ambient noise).
-   **Advanced Admin Analytics:** Detailed usage analytics, sensor uptime reports, and user activity logs to help administrators optimize the system.

---

## 👥 Authors & Acknowledgments

This project was developed by:
-   **Hiyaa Malik**
-   **Smriti Mahajan**

Under the invaluable guidance of **Dr. Anjali Sharma**, Senior Principal Scientist at CSIR-NPL.

We extend our sincere thanks to our coordinator, professors, colleagues, and the entire staff at **CSIR-National Physical Laboratory** and **Amity University, Uttar Pradesh** for their continuous support and encouragement.
