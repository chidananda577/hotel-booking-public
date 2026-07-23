export interface User {
  id: number;
  name: string;
  email: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

export interface Hotel {
  id: number;
  name: string;
  city: string;
  country: string;
  description?: string;
  pricePerNight: number;
  createdAt?: string;
}

export interface BookingRequest {
  hotelId: number;
  checkIn: string;
  checkOut: string;
}

export interface Booking {
  id: number;
  userId: number;
  hotelId: number;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  status: string;
  createdAt: string;
}
