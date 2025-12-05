// Pods API Service - Placeholder functions for backend integration

import { Pod, PodSubcategory, SocialLinks } from '@/types';

export interface CreatePodRequest {
  name: string;
  logo?: string;
  subcategory: PodSubcategory;
  focusAreas: string[];
  organisationName: string;
  organisationType: 'Government' | 'Private';
  operatingCity: string;
  totalInvestmentSize?: string;
  numberOfInvestments?: number;
  briefAboutOrganisation?: string;
  socialLinks: SocialLinks;
  coOwnerUsernames?: string[];
}

export interface UpdatePodRequest extends Partial<CreatePodRequest> {}

export const podsApi = {
  getAllPods: async (): Promise<Pod[]> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  getPodById: async (podId: string): Promise<Pod> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  getPodsBySubcategory: async (subcategory: PodSubcategory): Promise<Pod[]> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  createPod: async (data: CreatePodRequest): Promise<Pod> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  updatePod: async (podId: string, data: UpdatePodRequest): Promise<Pod> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  deletePod: async (podId: string): Promise<void> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  joinPod: async (podId: string, userId: string): Promise<void> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  leavePod: async (podId: string, userId: string): Promise<void> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  getPodMembers: async (podId: string): Promise<string[]> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  addCoOwner: async (podId: string, username: string): Promise<void> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  removeCoOwner: async (podId: string, userId: string): Promise<void> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  uploadPodLogo: async (podId: string, file: File): Promise<string> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  searchPods: async (query: string): Promise<Pod[]> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  getJoinedPods: async (userId: string): Promise<Pod[]> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },
};
