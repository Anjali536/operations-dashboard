## Operations Dashboard

A modern Live Vehicle Service Operations Dashboard built as a Full Stack Developer Intern assignment for Instant Mechanic.

The dashboard is designed for an operations team to monitor bookings, mechanics, customers, services, revenue, and overall service performance through a production-style SaaS interface.

## Live Application

Frontend: https://operations-dashboard-opal.vercel.app

Backend API: https://operations-dashboard.duckdns.org

GitHub Repository: https://github.com/Anjali536/operations-dashboard

## Project Overview

AutoCare Operations Dashboard is a full-stack vehicle service operations platform that provides a centralized view of daily service operations.

The application allows operations teams to:

Monitor booking and revenue KPIs

Track booking statuses

Analyze bookings and revenue over time

Analyze service/category performance

Search and filter bookings

Update booking statuses

Monitor mechanic availability and workload

View customer and service information

Work with live data retrieved from a backend API and MongoDB database

The goal was to build a dashboard that feels like a real internal operations product rather than a basic assignment interface.

## Key Features

Dashboard Overview

Total Bookings

Today's Bookings

Completed Bookings

Pending Bookings

Cancelled Bookings

Total Revenue

Active Mechanics

New Customers

Analytics

Bookings over time

Revenue over time

Booking status distribution

Service/category breakdown

Booking Management

Booking ID

Customer

Vehicle

Service

Mechanic

Status

Amount

Date and time

Search

Status filtering

Pagination

Booking status updates

Supported booking statuses:

Pending

Assigned

Mechanic On The Way

Completed

Cancelled

Mechanic Management

Mechanic name

Current status

Jobs completed

Current/last booking

Customer Management

Customer information is retrieved from the backend database.

Service Management

Available vehicle services, categories, and pricing information are retrieved from the backend.

UI/UX

Responsive dashboard layout

Sidebar navigation

Dark mode

Loading states

Error states with retry functionality

Empty states

Search and filtering controls

Interactive charts

Responsive tables

Consistent spacing and visual hierarchy

## Tech Stack

Frontend

React

React Router

Vite

CSS

Charting library

Backend

Node.js

Express.js

Mongoose

Database

MongoDB Atlas

Deployment & Infrastructure

Vercel — Frontend

AWS EC2 — Backend

Nginx — Reverse Proxy

PM2 — Node.js Process Manager

DuckDNS — Backend hostname

Let's Encrypt / Certbot — HTTPS

Version Control

Git

GitHub

## Architecture

                    ┌──────────────────────┐
                    │        User          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │       Vercel         │
                    └──────────┬───────────┘
                               │
                         HTTPS API Requests
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Nginx Reverse     │
                    │        Proxy         │
                    │       AWS EC2        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
                         Mongoose Queries
                               │
                               ▼
                    ┌──────────────────────┐
                    │     MongoDB Atlas    │
                    │       Database       │
                    └──────────────────────┘

The Node.js backend runs continuously on AWS EC2 using PM2.

Nginx acts as a reverse proxy and handles incoming HTTPS requests before forwarding them to the Express server running on port 5000.

## Project Structure

operations-dashboard/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md

## Database

MongoDB Atlas is used as the primary database.

The application uses separate collections/models for:

Bookings

Customers

Vehicles

Mechanics

Services

The database contains realistic seeded data including:

600 bookings

60 customers

25 mechanics

100 vehicles

Multiple service categories

Multiple booking statuses

Different dates and booking amounts

## API Documentation

Base URL:

https://operations-dashboard.duckdns.org/api

Dashboard

GET /dashboard

Returns dashboard KPIs and analytics data.

GET /api/dashboard

Includes:

Total bookings

Today's bookings

Completed bookings

Pending bookings

Cancelled bookings

Total revenue

Active mechanics

New customers

Booking analytics

Revenue analytics

Status breakdown

Service/category breakdown

Bookings

GET /bookings

Returns paginated bookings.

Supports pagination, search, and status filtering.

GET /api/bookings?page=1&limit=10

Search:

GET /api/bookings?page=1&limit=10&search=BOOK-1001

Status filtering:

GET /api/bookings?page=1&limit=10&status=Completed

GET /bookings/:id

Returns details of a specific booking with populated customer, vehicle, mechanic, and service information.

GET /api/bookings/:id

POST /bookings

Creates a new booking.

POST /api/bookings

PATCH /bookings/:id

Updates booking information/status.

PATCH /api/bookings/:id

The dashboard uses this endpoint to update booking status.

Mechanics

GET /mechanics

Returns mechanics along with their current/last booking information.

GET /api/mechanics

Customers

GET /customers

Returns customer information.

GET /api/customers

Services

Service information is retrieved from the backend and used throughout the application for service/category data.

## Local Setup

Prerequisites

Node.js 20+

npm

MongoDB Atlas account or MongoDB instance

Git

1. Clone the repository

git clone https://github.com/YOUR_USERNAME/operations-dashboard.git
cd operations-dashboard

Backend Setup

cd backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Start the backend:

npm start

Backend:

http://localhost:5000

Frontend Setup

Open another terminal:

cd frontend
npm install

Create a .env file:

VITE_API_URL=http://localhost:5000/api

Start the frontend:

npm run dev

Frontend:

http://localhost:5173


## Environment Variables

Backend

PORT=5000
MONGO_URI=your_mongodb_connection_string

Frontend

VITE_API_URL=your_backend_api_url

Production:

VITE_API_URL=https://operations-dashboard.duckdns.org/api

Environment files containing secrets are not committed to GitHub.

## Deployment

Frontend — Vercel

The React/Vite frontend is deployed on Vercel.

Build command:

npm run build

Output directory:

dist

The production API URL is configured through the Vercel environment variable:

VITE_API_URL=https://operations-dashboard.duckdns.org/api

Backend — AWS EC2

The backend is deployed on an AWS EC2 instance.

Deployment flow:

GitHub
   ↓
AWS EC2
   ↓
Node.js + Express
   ↓
PM2
   ↓
Nginx
   ↓
HTTPS

PM2 keeps the Node.js backend running independently of the SSH/browser terminal session.

Nginx acts as the reverse proxy and forwards requests to the Node.js application.

Backend:

https://operations-dashboard.duckdns.org

HTTPS

HTTPS is enabled using:

Nginx

Certbot

Let's Encrypt

This allows the Vercel HTTPS frontend to communicate with the backend without browser mixed-content restrictions.

## AI Usage

AI tools were used as an engineering assistant during development.

ClaudeCode

Used for:

Debugging frontend and backend issues

API design discussions

CSS/UI improvements

Deployment troubleshooting

Nginx configuration 

Understanding deployment errors

AI was also used to help reason through issues such as Linux filename casing, Node/Mongoose compatibility, reverse proxy configuration, and HTTPS/mixed-content problems.

Personal Implementation

The generated suggestions given below were reviewed, modified, and integrated into the project.

Project structure

React pages and components

Backend APIs

MongoDB schemas

Database seed data

Booking status management

Search/filter/pagination functionality

Dashboard analytics

Deployment configuration

Debugging and testing

Final UI/UX decisions

The project was tested and deployed manually.

## Engineering Decisions

Why MongoDB?

MongoDB provides a flexible document-oriented structure that fits the dashboard's entities while allowing rapid development with Mongoose.

Why Express?

Express provides a lightweight and maintainable API layer suitable for the assignment's REST-style endpoints.

Why AWS EC2?

The assignment requires the backend to be deployed using AWS Free Tier infrastructure. EC2 provides direct control over the Node.js runtime, process management, and reverse-proxy configuration.

Why Nginx?

Nginx provides a reliable reverse-proxy layer between the public HTTPS endpoint and the Node.js application.

Why PM2?

PM2 keeps the backend process running independently from the SSH session and allows the application to restart automatically when the EC2 instance restarts.

## What I Am Most Proud Of

I am particularly proud of taking the project beyond a locally working dashboard and successfully deploying the complete full-stack application.

The deployment required debugging several real-world issues including:

Node.js and Mongoose version compatibility

MongoDB connectivity

Persistent backend processes

Nginx reverse proxy configuration

DNS configuration

HTTPS certificate setup

Browser mixed-content restrictions

The final application is publicly accessible with the frontend deployed on Vercel and the backend running on AWS EC2 with HTTPS.

## Responsiveness

The dashboard is designed to work across different screen sizes with responsive layouts for:

Dashboard cards

Charts

Tables

Navigation

Search/filter controls

Landing page

## Author

Anjali Thakur
GitHub: https://github.com/Anjali536
