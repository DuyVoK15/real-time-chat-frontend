import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { SignUpRequest } from "../dtos/request/auth.request";
import { authService } from "../services/auth.service";
import { io } from "socket.io-client";

interface InitState {
  authUser: any;
  isCheckingAuth: boolean;
  socket: any;
  onlineUsers: string[];

  checkAuth: typeof authService.checkAuth;
  signup: (payload: SignUpRequest) => Promise<any>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<InitState>((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await authService.checkAuth();

      set({ authUser: res.data });
      get().connectSocket();
      return res.data;
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (payload: SignUpRequest) => {
    try {
      const res = await axiosInstance.post("/auth/signup", { ...payload });
      console.log({ userData: res.data });
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");

      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || get().socket?.connected) return;

    const socket = io("http://localhost:3001", {
      query: {
        userId: authUser.data._id,
      },
    });

    socket.connect();

    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {},
}));
