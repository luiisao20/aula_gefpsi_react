import type { Session, Subscription, User } from "@supabase/supabase-js";
import { create } from "zustand";

import { authLogin } from "../../core/auth/authActions";
import { supabase } from "../../../supabase";
import { updatePassword } from "../../core/database/users/user.action";

interface AuthState {
  user?: User;
  session?: Session;
  token?: string;
  status: "authenticated" | "unauthenticated" | "checking";
  authSubscription?: Subscription;
  loading: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  changeStatus: (session?: Session, user?: User) => Promise<boolean>;
  logout: () => Promise<void>;
  changePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: undefined,
  token: undefined,
  status: "checking",
  session: undefined,
  loading: false,

  login: async (email: string, password: string) => {
    set({ loading: true });
    const res = await authLogin(email, password);
    set({ loading: false });

    return get().changeStatus(res?.session, res?.user);
  },

  checkStatus: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    await get().changeStatus(session ?? undefined, session?.user);

    if (!session) console.log('error');
    

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === "SIGNED_OUT") {
        set({ status: "unauthenticated", session: undefined, user: undefined });
      } else if (event === "SIGNED_IN") {
        set({
          status: "authenticated",
          session: nextSession!,
          user: nextSession?.user,
        });
      }
    });

    set({ authSubscription: subscription });
  },

  changeStatus: async (session?: Session, user?: User) => {
    if (!session || !user) {
      set({ status: "unauthenticated", session: undefined, user: undefined });
      return false;
    }

    set({
      status: "authenticated",
      session: session,
      user: user,
    });
    return true;
  },

  logout: async () => {
    set({ loading: true });

    await supabase.auth.signOut();
    get().authSubscription?.unsubscribe();
    set({
      status: "unauthenticated",
      session: undefined,
      user: undefined,
    });
    set({ loading: false });
    return;
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    const user = get().user;
    const wasSuccessful = await updatePassword(
      oldPassword,
      newPassword,
      user?.email!
    );
    if (wasSuccessful) return true;
    return false;
  },
}));
