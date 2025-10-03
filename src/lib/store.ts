import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { chatService } from '@/lib/chat';
import type { Message, SessionInfo } from '../../worker/types';
import { v4 as uuidv4 } from 'uuid';
// --- Session Store ---
interface SessionState {
  sessions: SessionInfo[];
  activeSessionId: string | null;
  isLoading: boolean;
  error: string | null;
}
interface SessionActions {
  fetchSessions: () => Promise<void>;
  createSession: (firstMessage?: string) => Promise<string>;
  deleteSession: (sessionId: string) => Promise<void>;
  setActiveSessionId: (sessionId: string) => void;
}
export const useSessionStore = create<SessionState & SessionActions>()(
  immer((set, get) => ({
    sessions: [],
    activeSessionId: null,
    isLoading: true,
    error: null,
    fetchSessions: async () => {
      set({ isLoading: true, error: null });
      const response = await chatService.listSessions();
      if (response.success && response.data) {
        set({ sessions: response.data, isLoading: false });
        if (!get().activeSessionId && response.data.length > 0) {
          set({ activeSessionId: response.data[0].id });
        } else if (response.data.length === 0) {
          get().createSession();
        }
      } else {
        set({ error: response.error || 'Failed to fetch sessions', isLoading: false });
      }
    },
    createSession: async (firstMessage?: string) => {
      const newSessionId = uuidv4();
      const response = await chatService.createSession(undefined, newSessionId, firstMessage);
      if (response.success && response.data) {
        await get().fetchSessions();
        set({ activeSessionId: response.data.sessionId });
        return response.data.sessionId;
      }
      return '';
    },
    deleteSession: async (sessionId: string) => {
      await chatService.deleteSession(sessionId);
      await get().fetchSessions();
    },
    setActiveSessionId: (sessionId: string) => {
      set({ activeSessionId: sessionId });
    },
  }))
);
// --- Chat Store ---
interface ChatState {
  messages: Message[];
  streamingMessage: string | null;
  isProcessing: boolean;
  isLoadingHistory: boolean;
}
interface ChatActions {
  loadChatHistory: (sessionId: string) => Promise<void>;
  sendMessage: (message: string, sessionId: string) => Promise<void>;
  addMessage: (message: Message) => void;
  clearChat: () => void;
}
export const useChatStore = create<ChatState & ChatActions>()(
  immer((set, get) => ({
    messages: [],
    streamingMessage: null,
    isProcessing: false,
    isLoadingHistory: true,
    loadChatHistory: async (sessionId: string) => {
      set({ isLoadingHistory: true, messages: [] });
      chatService.switchSession(sessionId);
      const response = await chatService.getMessages();
      if (response.success && response.data) {
        set({ messages: response.data.messages, isLoadingHistory: false });
      } else {
        set({ isLoadingHistory: false });
      }
    },
    sendMessage: async (message: string, sessionId: string) => {
      if (get().isProcessing) return;
      const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content: message,
        timestamp: Date.now(),
      };
      set((state) => {
        state.messages.push(userMessage);
        state.isProcessing = true;
        state.streamingMessage = '';
      });
      // If this is the first message, create the session on the backend
      if (get().messages.length === 1) {
        const session = useSessionStore.getState().sessions.find(s => s.id === sessionId);
        if (!session) {
          await chatService.createSession(undefined, sessionId, message);
          await useSessionStore.getState().fetchSessions();
        }
      }
      chatService.switchSession(sessionId);
      await chatService.sendMessage(message, undefined, (chunk) => {
        set((state) => {
          state.streamingMessage += chunk;
        });
      });
      const response = await chatService.getMessages();
      if (response.success && response.data) {
        set({ messages: response.data.messages });
      }
      set({ isProcessing: false, streamingMessage: null });
    },
    addMessage: (message: Message) => {
      set((state) => {
        state.messages.push(message);
      });
    },
    clearChat: () => {
      set({ messages: [], streamingMessage: null });
    },
  }))
);