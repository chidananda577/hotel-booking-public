import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  Hotel,
  BookingRequest,
  Booking,
} from '../types';

const BASE_URL = 'http://localhost:8080/api';

class ApiClient {
  private getHeaders(includeAuth: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  async register(data: RegisterRequest): Promise<User> {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<User>(response);
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<LoginResponse>(response);
  }

  async searchHotels(query?: string): Promise<Hotel[]> {
    const url = query ? `${BASE_URL}/hotels?query=${encodeURIComponent(query)}` : `${BASE_URL}/hotels`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Hotel[]>(response);
  }

  async getHotelById(id: number): Promise<Hotel> {
    const response = await fetch(`${BASE_URL}/hotels/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Hotel>(response);
  }

  async createBooking(data: BookingRequest): Promise<Booking> {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Booking>(response);
  }

  async getMyBookings(): Promise<Booking[]> {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });
    return this.handleResponse<Booking[]>(response);
  }

  async cancelBooking(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/bookings/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(true),
    });
    return this.handleResponse<void>(response);
  }
}

export const apiClient = new ApiClient();
