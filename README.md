# Food Delivery System (MERN Stack)

## Features
- User authentication (JWT, roles: customer/admin)
- Browse restaurants and food menus
- Search/filter foods and restaurants
- Cart functionality (add/remove, persists for logged-in users)
- Place orders, view order history
- Contact form (admin can view messages)
- Admin dashboard (manage orders, view contacts)

## Folder Structure
- `backend/` — Node.js + Express API, MongoDB models, routes, controllers
- `frontend/` — React app (functional components, hooks, context)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
cp .env.example .env # Edit with your MongoDB URI and JWT secret
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Environment Variables (`backend/.env`)
```
MONGO_URI=mongodb://localhost:27017/fooddelivery
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Notes
- Create an admin user by manually setting the `role` field to `admin` in the database.
- All API endpoints are RESTful and secured where appropriate.
- For demo, you may seed restaurants/foods manually in MongoDB.

---
MIT License 