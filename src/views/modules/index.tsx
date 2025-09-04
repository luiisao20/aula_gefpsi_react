import { useEffect, useState } from "react";
import { useModules } from "../../presentation/modules/useModules";
import type { Module } from "../../interfaces/Module";
import { ModulesList } from "../../components/ModulesList";

export const ModulesStudent = () => {
  const [modulesList, setModulesList] = useState<Module[]>([]);

  const { modulesQuery } = useModules();

  useEffect(() => {
    if (modulesQuery.data) setModulesList(modulesQuery.data);
  }, [modulesQuery.data]);

  return (
    <div className="mt-20 mb-5 md:w-1/2 md:mx-auto bg-white py-2 md:px-4 px-1 rounded-xl mx-1">
      <h2 className="text-2xl font-bold text-center text-secondary">
        Conferencias habilitadas
      </h2>
      <ModulesList modulesList={modulesList} route="module" />
    </div>
  );
};
