# Barber Booking App

A full stack web app for booking barber appointments online.

## Features
- View services (price, duration) and barbers (experience, working hours)
- Book an appointment with a chosen barber, date and time
- Double booking prevention for the same barber and time slot
- Working-hours validation on every booking
- Responsive dark UI

## Tech Stack
- **Frontend:** React (Vite), CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)

## Run Locally

### 1. Backend
```bash
cd server
npm install
```
Create a `.env` file (see `.env.example`):
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/barber_db
```
```bash
npm run dev
```

### 2. Frontend
```bash
cd client
npm install
npm run dev
```
Open http://localhost:5173

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/services | List services |
| POST | /api/services | Add a service |
| GET | /api/barbers | List barbers |
| POST | /api/barbers | Add a barber |
| GET | /api/bookings | List bookings |
| POST | /api/bookings | Create a booking |
| PATCH | /api/bookings/:id/cancel | Cancel a booking |

## Author
Prakhar Seth