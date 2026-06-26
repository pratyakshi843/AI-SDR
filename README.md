# 🚀 AI SDR CRM

An AI-powered Sales Development Representative (SDR) platform built using FastAPI, React, PostgreSQL, OpenAI, and Google Gemini APIs.

The application allows users to securely manage sales leads, automatically qualify them using AI, and generate personalized outreach emails.

---

# ✨ Features

## Authentication

- JWT Authentication
- User Registration
- User Login
- Protected Routes
- User-specific lead management

---

## Lead Management

- Create Lead
- Edit Lead
- Delete Lead
- Search Leads
- Lead Dashboard
- Lead Statistics Cards

---

## AI Features

### OpenAI Lead Qualification

- AI evaluates lead quality
- Generates qualification status
- Generates lead score

### Gemini Email Generation

- Personalized cold email generation
- Email preview
- Copy email to clipboard

---

## Dashboard

- Responsive Dashboard
- Search Leads
- Statistics Cards
- Modern UI
- Gradient Design
- Beautiful Modals
- Toast Notifications

---

# 🛠 Tech Stack

## Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Lucide React
- React Hot Toast
- SweetAlert2

---

## Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Pydantic

---

## AI APIs

- OpenAI API
- Google Gemini API

---

# 📂 Project Structure

```
AI-SDR/
│
├── backend/
│   ├── app/
│   │
│   ├── models/
│   ├── routers/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   ├── dependencies.py
│   ├── database.py
│   └── main.py
│
├── frontend/
│   ├── src/
│   │
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   └── context/
│
├── screenshots/
├── postman/
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone <your-github-url>

cd AI-SDR
```

---

# Backend Setup

## Create Virtual Environment

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Mac/Linux

```bash
source venv/bin/activate
```

---

Install Dependencies

```bash
pip install -r requirements.txt
```

---

Create `.env`

```
DATABASE_URL=postgresql://username:password@localhost:5432/ai_sdr

SECRET_KEY=your_secret_key

ALGORITHM=HS256

OPENAI_API_KEY=xxxxxxxx

GEMINI_API_KEY=xxxxxxxx
```

---

Run Backend

```bash
uvicorn app.main:app --reload
```

Runs on

```
http://127.0.0.1:8000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Runs on

```
http://localhost:5173
```

---

# PostgreSQL

Create database

```
ai_sdr
```

Run migrations / create tables.

---

# API Endpoints

## Authentication

POST

```
/auth/register
```

POST

```
/auth/login
```

---

## Leads

GET

```
/leads
```

GET

```
/leads/{id}
```

POST

```
/leads
```

PUT

```
/leads/{id}
```

DELETE

```
/leads/{id}
```

---

## AI

POST

```
/ai/qualify/{lead_id}
```

POST

```
/ai/generate-email/{lead_id}
```

---

# Screenshots

Add screenshots inside

```
screenshots/
```

Example

```
Login Page

Dashboard

Create Lead

Edit Lead

Qualified Lead

Generated Email

Delete Confirmation
```

---

# Postman Collection

Import

```
postman/AI-SDR.postman_collection.json
```

Includes

- Register
- Login
- Get Leads
- Create Lead
- Update Lead
- Delete Lead
- Qualify Lead
- Generate Email

---

# Database

PostgreSQL

Tables

- users
- leads

Relationship

```
One User
      │
      │
Many Leads
```

---

# Future Improvements

- Analytics Dashboard
- Charts
- Export Leads to Excel
- Dark Mode
- Email Sending
- Pagination
- Team Collaboration
- Activity Timeline
- AI Recommendations

---

# Author

Pratyakshi Chauhan

MERN Stack Developer

Built as part of the AI SDR Internship Technical Assessment.

AI-SDR
│
├── backend
│
├── frontend
│
├── postman
│   └── AI-SDR.postman_collection.json
│
├── screenshots
│   ├── login.png
│   ├── register.png
│   ├── dashboard.png
│   ├── create-lead.png
│   ├── edit-lead.png
│   ├── qualified.png
│   ├── email-generated.png
│   └── delete.png
│
├── database
│   └── database.sql
│
├── README.md
│
├── .gitignore
│
└── requirements.txt