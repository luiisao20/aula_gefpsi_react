import { useEffect, useRef, useState } from "react";
import { FaBook } from "react-icons/fa";

import { ModalForm, type ModalRef } from "../../components/ModalComponent";
import type { Module } from "../../interfaces/Module";
import { useModules } from "../../presentation/modules/useModules";
import { Link } from "react-router";
import { GoArrowRight } from "react-icons/go";
import { Colors } from "../../assets/colors";
import api from "../../../api";

export const ModulesScreen = () => {
  const modalRef = useRef<ModalRef>(null);
  const [modulesList, setModulesList] = useState<Module[]>([]);
  const { modulesQuery } = useModules();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (modulesQuery.data) setModulesList(modulesQuery.data);
  }, [modulesQuery.data]);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/uploads/upload", formData);
    console.log("Archivo subido:", res.data.url);
  };

  return (
    <div>
      <ModalForm ref={modalRef} />
      <h2 className="text-xl font-semibold text-center text-secondary">
        Vista de los módulos
      </h2>
      <div className="flex justify-between items-center px-10">
        <h2 className="text-lg">¿Deseas crear un nuevo módulo?</h2>
        <button
          onClick={() => modalRef.current?.show()}
          className="flex items-center bg-primary text-white rounded-xl p-2 gap-2 cursor-pointer hover:bg-primary/60"
        >
          <FaBook size={20} />
          <span className="text-xl">Añadir</span>
        </button>
      </div>

      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        Upload file
      </label>
      <input
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
      />
      <button
        onClick={handleUpload}
        className="text-white font-semibold rounded-xl p-2 bg-secondary cursor-pointer"
      >
        Guardar
      </button>

      <div className="flex flex-col space-y-4 my-4 w-3/4 mx-auto">
        {modulesList.map((item) => (
          <Link
            to={`/generals/module/${item.id}`}
            className="shadow rounded-xl cursor-pointer p-2 flex justify-between px-4 items-center
            hover:transition hover:delay-100 hover:scale-115 hover:shadow-secondary"
            key={item.id}
          >
            Módulo {item.number}{" "}
            <GoArrowRight size={25} color={Colors.primary} />
          </Link>
        ))}
      </div>
    </div>
  );
};
