import { supabase } from "../../../../supabase";
import type { Student } from "../../../interfaces/Students";

export const getUser = async (userId: string): Promise<Student> => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  const student: Student = {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    admin: data.admin,
    biography: data.biography,
    urlPhoto: data.url_photo,
  };

  return student;
};

export const updateBiography = async (text: string, userId: string) => {
  const { error } = await supabase
    .from("users")
    .update({ biography: text })
    .eq("id", userId);

  if (error) throw new Error(error.message);

  return true;
};

export const updatePassword = async (
  oldPassword: string,
  newPassword: string,
  email: string
) => {
  const { error: errorSignIn } = await supabase.auth.signInWithPassword({
    email,
    password: oldPassword,
  });

  if (errorSignIn) {
    alert("Error la contraseña actual es incorrecta");
    return null;
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.log(error);
    alert("Error Algo salió mal");
    return null;
  }

  return true;
};

export const createUser = async (
  firstName: string,
  lastName: string,
  idUser: string
) => {
  const { error } = await supabase
    .from("users")
    .insert({ first_name: firstName, last_name: lastName, id: idUser });

  if (error) throw new Error(error.message);

  return false;
};
