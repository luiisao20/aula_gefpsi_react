import { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";

import type { Module } from "../../interfaces/Module";
import { useModules } from "../../presentation/modules/useModules";
import { ModulesList } from "../../components/ModulesList";
import { ModalRForm, type ModalReactProps } from "../../components/ModalReact";

export const ModulesScreen = () => {
  const [modulesList, setModulesList] = useState<Module[]>([]);
  const [modalProps, setModalProps] = useState<ModalReactProps>({
    message: "",
    open: false,
  });

  const { modulesQuery, moduleMutation } = useModules();

  useEffect(() => {
    if (modulesQuery.data) setModulesList(modulesQuery.data);
  }, [modulesQuery.data]);

  return (
    <div>
      <ModalRForm
        open={modalProps.open}
        loading={moduleMutation.isPending}
        onClose={() => setModalProps((prev) => ({ ...prev, open: false }))}
        onSendData={async(data) => {
          await moduleMutation.mutateAsync(data as Module);
          setModalProps((prev) => ({ ...prev, open: false }));
        }}
      />
      <h2 className="text-xl font-semibold text-center text-secondary">
        Vista de los módulos
      </h2>
      <div className="flex justify-between items-center px-10">
        <h2 className="text-lg">¿Deseas crear un nuevo módulo?</h2>
        <button
          onClick={() => setModalProps((prev) => ({ ...prev, open: true }))}
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
