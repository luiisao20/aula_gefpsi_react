import type { Module } from "../../../interfaces/Module";
import { useModules } from "../../../presentation/modules/useModules";
import { useEffect, useState } from "react";
import { ModulesList } from "../../../components/ModulesList";

export const StudentModules = () => {
  const [modulesList, setModulesList] = useState<Module[]>([]);
  const { modulesQuery } = useModules();

  useEffect(() => {
    if (modulesQuery.data) setModulesList(modulesQuery.data);
  }, [modulesQuery.data]);

  return <ModulesList modulesList={modulesList} route="students" />;
};
