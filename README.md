# 🚌 Bus Booking Application

## 📌 Overview

The **Bus Booking Application** is a full-stack system designed to provide a seamless and secure platform for users to search buses, check seat availability, and book tickets online. The application follows a structured architecture with well-defined modules, ensuring scalability, maintainability, and real-world usability.

This system is built using **Spring Boot (Backend)** and **React (Frontend)**, with a focus on RESTful API design, database normalization, and secure user management.

---

## 🎯 Key Features

* 🔍 Search buses based on source, destination, and travel date
* 💺 View real-time seat availability
* 🎟️ Book and cancel bus tickets
* 👤 User registration and authentication
* 💳 Payment handling (mock/extendable)
* 📩 Email notifications for booking and cancellation
* 📜 Booking history and details

---

## 🧱 System Design

The application is designed using a **layered architecture**:

* **Controller Layer** – Handles API requests
* **Service Layer** – Business logic
* **Repository Layer** – Database interaction
* **Database Layer** – MySQL / H2

---

## 🗄️ Database Overview

The system uses a normalized database structure with the following core entities:

* Users
* Buses
* Routes
* Bus Schedules
* Seats
* Bookings
* Tickets
* Payments

This design ensures:

* Efficient data handling
* Real-time seat tracking
* Scalability for large datasets

---

## 🔐 Security

* User authentication using **JWT (JSON Web Token)**
* Secure password storage (encryption)
* Role-based access control

---

## 📡 API Design

The application exposes RESTful APIs for:

* Authentication (Register/Login)
* Bus & Route Management
* Search & Scheduling
* Booking & Seat Selection
* Payment Processing

---

## ⚙️ Technologies Used

### Backend

* Spring Boot
* Spring Data JPA
* Spring Security

### Frontend

* React

### Database

* MySQL / H2

---

## 🚀 Key Highlights

* Modular development approach (team-based)
* Clean API structure with proper HTTP methods
* Centralized exception handling
* Scalable and maintainable design

---

## 🏆 Project Goal

The goal of this project is to simulate a **real-world bus booking system** with proper architecture, workflow handling, and clean coding practices, making it suitable for learning, demonstration, and interview discussions.

---
