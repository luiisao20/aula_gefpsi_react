import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../../supabase";

export const authLogin = async (
  email: string,
  password: string
): Promise<{ user: User; session: Session } | null> => {
  email = email.toLowerCase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const session: Session | null = data.session;
  const user: User | null = data.user;

  if (error || !session || !user) {
    throw new Error(error?.message);
  }

  return { user, session };
};

export const authRegister = async (
  email: string,
  password: string
): Promise<{ user: User; session: Session } | null> => {
  email = email.toLowerCase();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  const session: Session | null = data.session;
  const user: User | null = data.user;

  if (error || !session || !user) {
    throw new Error(error?.message);
  }

  return { user, session };
};
