# Hotel Booking MVP

A full-stack hotel booking application built with React (Vite + TypeScript) frontend and Spring Boot backend, featuring JWT authentication and H2 database.

## 🏗️ Architecture

- **Frontend:** React 18 + Vite + TypeScript
- **Backend:** Spring Boot 3.2 + Spring Security + JWT
- **Database:** H2 (in-memory/file-based)
- **Authentication:** JWT with BCrypt password hashing

## 📋 Features

### User Features
- User registration and login with JWT authentication
- Browse and search hotels by name, city, or country
- View detailed hotel information
- Book hotels with date selection
- View booking history
- Cancel bookings

### Security Features
- JWT-based authentication
- BCrypt password hashing
- Protected API endpoints
- Booking ownership validation
- Overlap prevention for hotel bookings

## 🚀 Getting Started

### Prerequisites

- **Backend:**
  - Java 17 or higher
  - Maven 3.6+

- **Frontend:**
  - Node.js 18+ and npm

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

**H2 Console:** Access at `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:file:./data/hotelbooking`
- Username: `sa`
- Password: (leave blank)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📡 API Endpoints

### Authentication (Public)
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Authenticate and get JWT token

### Hotels (Public)
- `GET /api/hotels` - List all hotels (optional `?query=` param)
- `GET /api/hotels/{id}` - Get hotel details

### Bookings (Protected - Requires JWT)
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get user's booking history
- `DELETE /api/bookings/{id}` - Cancel a booking

## 🗄️ Database Schema

### Users
- id, name, email (unique), password_hash, role, created_at

### Hotels
- id, name, city, country, description, price_per_night, created_at

### Bookings
- id, user_id (FK), hotel_id (FK), check_in, check_out, status, created_at

## 🧪 Sample Hotels

The application comes with 10 pre-seeded hotels across various Indian cities:
- Sea View Resort (Goa)
- City Inn (Bengaluru)
- Mountain Lodge (Manali)
- Heritage Palace (Jaipur)
- Lake View Resort (Udaipur)
- And more...

## 🔐 JWT Configuration

JWT secret and expiration can be configured in `backend/src/main/resources/application.properties`:

```properties
jwt.secret=hotel-booking-secret-key-must-be-at-least-256-bits-long-for-HS256-algorithm
jwt.expiration=3600000  # 1 hour in milliseconds
```

## 🛠️ Development

### Backend
- Spring Boot DevTools enabled for hot reload
- H2 console available for database inspection
- Hibernate DDL auto-update enabled

### Frontend
- Vite HMR (Hot Module Replacement) for instant updates
- React Router for navigation
- Context API for authentication state

## 📦 Project Structure

```
MyHotelApp/
├── backend/
│   ├── src/main/java/com/hotelbooking/
│   │   ├── controller/      # REST controllers
│   │   ├── service/         # Business logic
│   │   ├── repository/      # JPA repositories
│   │   ├── entity/          # JPA entities
│   │   ├── dto/             # Data transfer objects
│   │   ├── security/        # Security configuration
│   │   └── exception/       # Exception handlers
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql         # Seed data
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React Context
│   │   └── types/           # TypeScript types
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── design_artifacts.md      # Design documentation
```

## 🔧 Configuration

### Backend Port
Change in `application.properties`:
```properties
server.port=8080
```

### Frontend Port
Change in `vite.config.ts`:
```typescript
server: {
  port: 5173,
}
```

### CORS Configuration
Backend allows origins from:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (Create React App default)

## 🐛 Common Issues

### Port Already in Use
- Backend: Change `server.port` in `application.properties`
- Frontend: Change port in `vite.config.ts`

### CORS Errors
- Ensure backend is running on port 8080
- Check CORS configuration in `SecurityConfig.java`

### JWT Errors (401 Unauthorized)
- Token might be expired (default 1 hour)
- Ensure token is in localStorage
- Check `Authorization: Bearer <token>` header

## 📝 License

This project is created for educational purposes.

## 🤝 Contributing

This is an MVP project. For production use, consider:
- Move to production-grade database (PostgreSQL/MySQL)
- Add comprehensive validation
- Implement refresh tokens
- Add payment integration
- Implement real-time availability checks
- Add email notifications
- Implement admin panel
