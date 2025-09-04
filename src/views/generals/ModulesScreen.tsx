import { useEffect, useRef, useState } from "react";
import { FaBook } from "react-icons/fa";

import { ModalForm, type ModalRef } from "../../components/ModalComponent";
import type { Module } from "../../interfaces/Module";
import { useModules } from "../../presentation/modules/useModules";
import { ModulesList } from "../../components/ModulesList";

export const ModulesScreen = () => {
  const modalRef = useRef<ModalRef>(null);
  const [modulesList, setModulesList] = useState<Module[]>([]);
  const { modulesQuery } = useModules();

  useEffect(() => {
    if (modulesQuery.data) setModulesList(modulesQuery.data);
  }, [modulesQuery.data]);

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
      <ModulesList modulesList={modulesList} route="generals" generals />
    </div>
  );
};
