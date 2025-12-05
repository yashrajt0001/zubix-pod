// Users API Service - Placeholder functions for backend integration

import { UserProfile, SocialLinks } from '@/types';

export interface UpdateProfileRequest {
  fullName?: string;
  profilePhoto?: string;
  organisationName?: string;
  brandName?: string;
  designation?: string;
  workingExperienceFrom?: Date;
  workingExperienceTo?: Date;
  startupSubcategory?: string;
  businessType?: string;
  briefAboutOrganisation?: string;
  operatingCity?: string;
  website?: string;
  socialLinks?: SocialLinks;
}

export const usersApi = {
  getProfile: async (userId: string): Promise<UserProfile> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  updateProfile: async (userId: string, data: UpdateProfileRequest): Promise<UserProfile> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  uploadProfilePhoto: async (userId: string, file: File): Promise<string> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  searchUsers: async (query: string): Promise<UserProfile[]> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  getUserByUsername: async (username: string): Promise<UserProfile> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  completeUserRegistration: async (
    userId: string,
    data: UpdateProfileRequest
  ): Promise<UserProfile> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },
};
