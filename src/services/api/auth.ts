// Auth API Service - Placeholder functions for backend integration

export interface LoginRequest {
  emailOrMobile: string;
  password: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    mobile: string;
    username: string;
  };
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  logout: async (): Promise<void> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  refreshToken: async (): Promise<{ token: string }> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  forgotPassword: async (email: string): Promise<void> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  verifyEmail: async (token: string): Promise<void> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  getCurrentUser: async (): Promise<AuthResponse['user']> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },
};
