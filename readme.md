# NGO Help Platform

A comprehensive platform for NGOs to submit their monthly reports and for administrators to track the impact through an interactive dashboard.

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- React Toastify for notifications
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Cookie-parser for handling cookies
- CORS for cross-origin resource sharing

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- Git

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   PORT=5500
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Admin Access
Use these credentials to access the admin dashboard:
- Email: ujjwalshrivastava2323@gmail.com
- Password: Ujjwal@123

## Features
- Secure authentication system
- Interactive dashboard with real-time statistics
- Monthly report submission for NGOs
- Animated counters and beautiful UI components
- Protected routes for admin access
- Responsive design for all screen sizes

## API Endpoints
- `POST /api/auth/login` - Admin login
- `GET /api/auth/logout` - Admin logout
- `POST /api/reports` - Submit NGO report
- `GET /api/dashboard` - Get dashboard statistics

## Local Development
Frontend runs on: http://localhost:5173
Backend runs on: http://localhost:5500

## Recording Link
https://drive.google.com/file/d/1hk-sbl8FjZbt9HMo1bKFGuoqVfFcPlvQ/view?usp=sharing