import { useEffect, useState } from "react";
import { useAuthStore } from "../../presentation/auth/useAuthStore";
import { useStudent } from "../../presentation/student/useStudent";
import type { Student } from "../../interfaces/Students";
import { LoaderComponent } from "../../components/SpinnerComponent";

export const Profile = () => {
  const [description, setDescription] = useState<string>("");
  const [dataUser, setDataUser] = useState<Student>();

  const { user } = useAuthStore();
  const { studentQuery, studentMutation } = useStudent(user?.id!);

  useEffect(() => {
    if (studentQuery.data) setDataUser(studentQuery.data);
  }, [studentQuery.data]);

  useEffect(() => {
    if (studentQuery.data) setDescription(studentQuery.data.biography ?? "");
  }, [studentQuery.data]);

  if (studentQuery.isLoading) {
    return <LoaderComponent />;
  }

  return (
    <div className="bg-white rounded-xl p-4">
      <h1 className="text-center mb-4 text-xl font-semibold">
        Bienvenido {dataUser?.firstName} {dataUser?.lastName}
      </h1>
      <h2 className="px-4">Correo: {user?.email}</h2>
      <div className="my-5 px-4">
        <h2 className="mb-4">Realiza una breve descripción de tu persona</h2>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="px-4 py-2 bg-white rounded-t-lg">
            <label htmlFor="comment" className="sr-only">
              Realiza una breve descripción de tu persona
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="comment"
              rows={8}
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0"
              placeholder="Biografía personal"
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t">
            <button
              disabled={description.trim() === "" && studentMutation.isPending}
              onClick={() => studentMutation.mutate(description)}
              className="bg-primary text-white p-2 font-semibold rounded-xl cursor-pointer"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
