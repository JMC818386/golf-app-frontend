import {
  LOGIN_ENDPOINT,
  REFRESH_ENDPOINT,
  REGISTER_ENDPOINT,
} from './auth.constants';

import request from './api.request';

class AuthService {
  constructor() {
    this.login = this.login.bind(this);
  }

  async login(username, password) {
    try {
      console.log('AuthService: Attempting login with:', { username, endpoint: LOGIN_ENDPOINT });
      const response = await request({
        url: LOGIN_ENDPOINT,
        method: 'POST',
        data: {
          username,
          password,
        },
      });

      console.log('AuthService: Response received:', response);
      console.log('AuthService: Response data:', response.data);

      if (response.data.access) {
        console.log('AuthService: Access token found, setting token');
        return this.setToken(response);
      } else {
        console.error('AuthService: No access token in response');
        return null;
      }
    } catch (error) {
      console.error('AuthService: Login failed with error:', error);
      console.error('AuthService: Error response:', error.response);
      console.error('AuthService: Error response data:', error.response?.data);
      console.error('AuthService: Error message:', error.message);
      return null;
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  async register({
    username,
    email,
    password,
    firstName,
    lastName,
  }) {
    try {
      const response = await request({
        url: REGISTER_ENDPOINT,
        method: 'POST',
        data: {
          username,
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        },
      });

      // Registration successful, now login
      const loginResult = await this.login(username, password);
      return loginResult;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  } setToken(response) {
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  }

  async refreshToken() {
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (user.refresh) {
        const response = await request({
          url: REFRESH_ENDPOINT,
          method: 'POST',
          data: {
            refresh: user.refresh,
          },
        });

        return response.data;
      }
    } catch (error) {
      return error.response;
    }
  }
}

export default new AuthService();
