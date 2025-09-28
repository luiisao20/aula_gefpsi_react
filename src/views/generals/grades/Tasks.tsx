import { useEffect, useState } from "react";
import type { Module } from "../../../interfaces/Module";
import {
  useModule,
  useModules,
} from "../../../presentation/modules/useModules";
import { useUsersTasks } from "../../../presentation/tasks/useUsersTasks";
import type { StudentTask } from "../../../interfaces/Tasks";
import { TableStudentsTasks } from "../../../components/TableComponent";

export const TasksGrades = () => {
  const [modulesData, setModulesData] = useState<Module[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [moduleData, setModuleData] = useState<Module>();
  const [studentsTasks, setStudentsTasks] = useState<StudentTask[]>([]);

  const { moduleQuery } = useModule(selectedId?.toString());
  const { modulesQuery } = useModules();
  const { tasksQuery } = useUsersTasks(moduleData?.id);

  useEffect(() => {
    if (modulesQuery.data) setModulesData(modulesQuery.data);
  }, [modulesQuery.data]);

  useEffect(() => {
    if (moduleQuery.data) setModuleData(moduleQuery.data);
  }, [moduleQuery.data]);

  useEffect(() => {
    if (selectedId) moduleQuery.refetch();
  }, [selectedId]);

  useEffect(() => {
    if (moduleData?.id) tasksQuery.refetch();
  }, [moduleData]);

  useEffect(() => {
    if (tasksQuery.data) setStudentsTasks(tasksQuery.data);
  }, [tasksQuery.data]);

  return (
    <div className="my-6">
      <form className="flex justify-center items-center">
        <label
          htmlFor="modules"
          className="block w-full mb-2 text-base font-medium text-gray-900"
        >
          Selecciona una opción
        </label>
        <select
          value={selectedId ?? ""}
          onChange={(e) => setSelectedId(parseInt(e.target.value))}
          id="modules"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/50 focus:border-primary/50 w-full block p-2.5"
        >
          <option value="" disabled>
            Escoje una conferencia
          </option>
          {modulesData.map((item) => (
            <option key={item.id} value={item.id}>
              Conferencia {item.number}
            </option>
          ))}
        </select>
      </form>
      {moduleData && (
        <div>
          <h2 className="text-xl text-center my-4 text-secondary">
            <span className="font-semibold">Conferencia:</span>{" "}
            {moduleData?.title}
          </h2>
          <TableStudentsTasks idModule={moduleData.id} students={studentsTasks} />
        </div>
      )}
    </div>
  );
};
