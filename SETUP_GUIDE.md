# College Master - Student Login System Setup Guide

This guide explains the complete student login CRUD system created for your College Master project.

## 📋 Overview

The system includes:
- **Backend**: Express.js API with MongoDB
- **Frontend**: React with Vite
- **Authentication**: JWT-based authentication
- **Features**: Register, Login, Profile View, Profile Edit, Logout

---

## 🔧 Backend Setup

### Dependencies Added
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `dotenv` - Environment variables

### Backend Structure

```
college-master-backend/
├── Module/
│   └── Student.js           # MongoDB schema with password hashing
├── Controller/
│   └── StudentController.js # All CRUD operations
├── Middleware/
│   └── auth.js             # JWT authentication middleware
├── Route/
│   └── StudentRoute.js     # API routes
├── index.js                # Main server file
└── .env                    # Environment variables
```

### Backend Routes

**Public Routes:**
- `POST /api/students/register` - Register new student
- `POST /api/students/login` - Login student

**Protected Routes (require JWT token):**
- `GET /api/students/profile` - Get student profile
- `PUT /api/students/profile` - Update student profile
- `DELETE /api/students/profile` - Delete student account
- `POST /api/students/logout` - Logout

**Admin Routes:**
- `GET /api/students` - Get all students

### Environment Variables (.env)

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/collegemaster
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
```

### Student Model Fields

- `name` - Full name (required)
- `email` - Email address (required, unique)
- `password` - Hashed password (required, min 6 chars)
- `rollNumber` - Student roll number (required, unique)
- `department` - Department (required)
- `semester` - Semester 1-8 (required)
- `phoneNumber` - Phone number (optional)
- `isActive` - Account active status (default: true)
- `timestamps` - Created and updated dates

---

## 🎨 Frontend Setup

### Dependencies Added
- `axios` - HTTP client
- `react-router-dom` - Routing

### Frontend Structure

```
college-master-frontend/src/
├── components/
│   ├── Login.jsx           # Login form
│   ├── Register.jsx        # Registration form
│   ├── Dashboard.jsx       # Student profile dashboard
│   └── ProtectedRoute.jsx  # Route protection component
├── context/
│   └── AuthContext.jsx     # Auth state management
├── services/
│   └── studentAPI.js       # API calls
└── App.jsx                 # Main app with routing
```

### Frontend Components

#### 1. **Login.jsx**
- Email and password login form
- Error handling
- Loading states
- Redirect to dashboard on success
- Link to register page

#### 2. **Register.jsx**
- Full registration form with fields:
  - Name, Email, Roll Number
  - Department, Semester
  - Phone Number (optional)
  - Password confirmation validation
- Comprehensive form validation
- Loading states
- Error messages

#### 3. **Dashboard.jsx**
- Profile display
- Edit profile functionality
- Logout button
- Real-time updates
- Profile avatar with initials

#### 4. **AuthContext.jsx**
- Centralized authentication state
- Methods: `register()`, `login()`, `logout()`, `updateProfile()`
- Automatic token persistence
- Loading and error states

#### 5. **studentAPI.js**
- Centralized API service
- Automatic token injection in requests
- Error handling
- Methods for all endpoints

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud - MongoDB Atlas)
- npm or yarn

### Backend Installation & Running

1. **Navigate to backend folder:**
   ```bash
   cd college-master-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup MongoDB:**
   - Install MongoDB locally, OR
   - Use MongoDB Atlas (cloud)
   - Update `MONGODB_URI` in `.env`

4. **Update JWT Secret in .env:**
   ```
   JWT_SECRET=your_secret_key_123
   ```

5. **Start the server:**
   ```bash
   npm run dev    # Uses nodemon for auto-reload
   # OR
   npm start      # Regular server start
   ```

   Server will run on: `http://localhost:3000`

### Frontend Installation & Running

1. **Navigate to frontend folder:**
   ```bash
   cd college-master-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update API base URL (if needed):**
   - In `src/services/studentAPI.js`
   - Change `API_BASE_URL` if backend is on different port

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Frontend will typically run on: `http://localhost:5173`

---

## 🔐 Authentication Flow

1. **User registers** → Password hashed → Token generated → User logged in
2. **User logs in** → Credentials verified → JWT token returned → Token stored in localStorage
3. **Protected routes** → Token extracted from header → JWT verified → Access granted/denied
4. **Token persistence** → On page reload, token auto-loads → Profile auto-fetches

---

## 📝 API Request Examples

### Register
```bash
POST http://localhost:3000/api/students/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "rollNumber": "CS001",
  "department": "CS",
  "semester": 4,
  "phoneNumber": "9876543210"
}
```

### Login
```bash
POST http://localhost:3000/api/students/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Profile (with token)
```bash
GET http://localhost:3000/api/students/profile
Authorization: Bearer <token>
```

### Update Profile (with token)
```bash
PUT http://localhost:3000/api/students/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe Updated",
  "phoneNumber": "9876543211",
  "department": "CS",
  "semester": 5
}
```

---

## 🛡️ Security Features

- ✅ Passwords hashed with bcryptjs (salt rounds: 10)
- ✅ JWT token-based authentication
- ✅ Token expiration (7 days by default)
- ✅ Protected routes - authentication middleware
- ✅ Unique email and roll number validation
- ✅ CORS ready (add to backend if needed)
- ✅ Input validation on both frontend and backend

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in .env
- For MongoDB Atlas, add your IP to whitelist

### CORS Error
- Add CORS middleware to `index.js`:
  ```javascript
  const cors = require('cors');
  app.use(cors());
  ```
- Install: `npm install cors`

### Token Validation Errors
- Ensure token format is: `Bearer <token>`
- Check JWT_SECRET matches in backend
- Token might be expired (check JWT_EXPIRE)

### Frontend Can't Connect to Backend
- Verify backend is running on port 3000
- Check `API_BASE_URL` in `studentAPI.js`
- Add CORS headers if on different ports

---

## 📱 Testing the System

1. **Register a student:**
   - Go to `http://localhost:5173/register`
   - Fill form with valid data
   - Submit

2. **Login:**
   - Go to `http://localhost:5173/login`
   - Use registered email/password
   - Should redirect to dashboard

3. **View & Edit Profile:**
   - Click "Edit Profile" on dashboard
   - Update information
   - Click "Save Changes"

4. **Logout:**
   - Click "Logout" button
   - Should redirect to login page

---

## 🔄 Next Steps (Optional Enhancements)

- [ ] Add email verification
- [ ] Implement password reset functionality
- [ ] Add role-based access (admin/student)
- [ ] Add profile picture upload
- [ ] Implement search/filter students
- [ ] Add pagination for student list
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Student activity logging

---

## 📞 Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure both backend and frontend are running
4. Check network requests in browser DevTools
5. Verify database connection is working

---

**Happy Coding! 🎉**
