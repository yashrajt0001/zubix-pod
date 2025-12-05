// Pitches API Service - Placeholder functions for backend integration

import { Pitch, PitchStatus, StartupStage } from '@/types';

export interface CreatePitchRequest {
  podId: string;
  startupName: string;
  pitchDeckUrl?: string;
  summary: string;
  sector: string;
  stage: StartupStage;
  ask: string;
  operatingCity: string;
  website?: string;
  contactEmail: string;
  contactPhone: string;
}

export interface UpdatePitchStatusRequest {
  pitchId: string;
  status: PitchStatus;
}

export const pitchesApi = {
  getPodPitches: async (podId: string): Promise<Pitch[]> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  getPitchById: async (pitchId: string): Promise<Pitch> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  getUserPitches: async (userId: string): Promise<Pitch[]> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  createPitch: async (data: CreatePitchRequest): Promise<Pitch> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  updatePitch: async (pitchId: string, data: Partial<CreatePitchRequest>): Promise<Pitch> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  deletePitch: async (pitchId: string): Promise<void> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  updatePitchStatus: async (data: UpdatePitchStatusRequest): Promise<Pitch> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  uploadPitchDeck: async (pitchId: string, file: File): Promise<string> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  getPitchesByStatus: async (podId: string, status: PitchStatus): Promise<Pitch[]> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },
};
