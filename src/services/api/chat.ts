// Chat API Service - Placeholder functions for backend integration

import { Chat, Message } from '@/types';

export interface CreateChatRequest {
  participantIds: string[];
}

export interface SendDMRequest {
  chatId: string;
  content: string;
}

export const chatApi = {
  getUserChats: async (userId: string): Promise<Chat[]> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  getChatById: async (chatId: string): Promise<Chat> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  getChatByParticipants: async (participantIds: string[]): Promise<Chat | null> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  createChat: async (data: CreateChatRequest): Promise<Chat> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  getChatMessages: async (chatId: string): Promise<Message[]> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  sendMessage: async (data: SendDMRequest): Promise<Message> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  deleteMessage: async (messageId: string): Promise<void> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  markAsRead: async (chatId: string, userId: string): Promise<void> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },

  getOrCreateChat: async (currentUserId: string, targetUserId: string): Promise<Chat> => {
    // TODO: Implement backend integration
    throw new Error('Not implemented');
  },
};
