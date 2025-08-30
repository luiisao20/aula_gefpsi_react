import { useState } from "react";

export const Profile = () => {
  const [description, setDescription] = useState<string>("");

  return (
    <div className="bg-white rounded-xl p-4">
      <h1 className="text-center mb-4 text-xl font-semibold">
        Bienvenido Luis Bravo!
      </h1>
      <h2 className="px-4">Grupo: GR4</h2>
      <h2 className="px-4">Correo: bravo.luis.1995@gmail.com</h2>
      <form action="" className="my-5 px-4">
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
              disabled={description.trim() === ""}
              className="bg-primary text-white p-2 font-semibold rounded-xl"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
