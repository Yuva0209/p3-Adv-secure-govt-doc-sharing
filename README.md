# 🔐 Secure Government Document Share Platform

A secure and user-friendly platform to **store**, **manage**, and **share government documents** with trusted family members. Built using **HTML, Tailwind CSS, JavaScript, and Firebase**, this platform ensures **data privacy, OTP/email-based authentication**, and **controlled access**.

---

## 📝 Overview

This web application allows users to upload, view, manage, and share important government documents like Aadhaar, PAN, etc., with their family members securely. It uses **Firebase Authentication**, **Firestore**, and **Cloud Storage** to provide real-time and secure services.

---

## 🧱 Core Features

### 🔑 User Authentication
- Email/OTP-based login and registration
- Firebase Authentication for secure sessions
- Session handling and access control

### 📂 Document Upload & Management
- Upload PDF, JPG, PNG files
- Update or delete existing documents
- Real-time storage in Firebase Cloud Storage

### 👨‍👩‍👧‍👦 Family Sharing
- Share documents with family members via email
- View sharing history and access logs
- Secure permission management

### 👤 Profile Management
- Edit personal profile (name, contact, profile picture)
- Add/manage linked family members

---

## 🏛️ System Architecture

- **Frontend**: HTML + Tailwind CSS + JavaScript
- **Backend (BaaS)**: Firebase
- **Database**: Firebase Firestore
- **Storage**: Firebase Cloud Storage
- **Authentication**: Firebase Auth (Email, OTP)

---

## 🧩 Key Components

- `Register/Login` screens (with email or OTP)
- `Dashboard`: Upload, view, share, delete documents
- `Upload Form`: Handles file metadata and upload
- `Profile Page`: Update user details
- `Share Panel`: Invite family members via email
- `Action Logger`: Tracks all user actions

---

## 🔄 Data Flow

1. **Authentication** via Firebase (OTP/Email)
2. **Dashboard Access** upon login
3. **Document Upload** → Stored in Cloud Storage, metadata saved in Firestore
4. **Sharing** → Invite via email → Grant access
5. **Logging** → Tracks upload, delete, share actions in Firestore

---

## 🔗 External Dependencies

- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Cloud Storage](https://firebase.google.com/docs/storage)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🚀 Deployment Strategy

- Hosted on **Firebase Hosting**
- Secure Firebase project config using `.env` file
- CI/CD using GitHub
- Optional: Link custom domain with SSL enabled

---

## 🧾 Changelog

| Date         | Update Description                       |
|--------------|-------------------------------------------|
| June 22, 2025 | ✅ Initial Setup with Firebase & Auth     |
| June 25, 2025 | 📂 Document upload & sharing added       |
| July 01, 2025 | 👤 Profile management module integrated  |
| July 05, 2025 | 📄 Logging system implemented            |

---

## ⚙️ User Preferences
  
- 🇮🇳 Multilingual support (upcoming)  
- 📲 Mobile responsive UI    



