import { useEffect, useState } from "react";
import {
  useModule,
  useModules,
} from "../../../presentation/modules/useModules";
import type { Module } from "../../../interfaces/Module";
import { useModuleGrades } from "../../../presentation/grades/useGrades";
import type { StudentGradeModule } from "../../../interfaces/Grades";
import { TableStudents } from "../../../components/TableComponent";
import { LoaderComponent } from "../../../components/SpinnerComponent";

export interface Filter {
  completed?: boolean;
  approven?: boolean;
}

type OptionFilter =
  | "Completados"
  | "No completados"
  | "Aprobadas"
  | "No aprobadas";

const optionFilters: OptionFilter[] = [
  "Completados",
  "No completados",
  "Aprobadas",
  "No aprobadas",
];

export const GradesConferences = () => {
  const [modulesData, setModulesData] = useState<Module[]>([]);
  const [gradesData, setGradesData] = useState<StudentGradeModule[]>([]);
  const [moduleData, setModuleData] = useState<Module>();
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [filters, setFilters] = useState<Filter>({});

  const { moduleQuery } = useModule(selectedId?.toString());
  const { modulesQuery } = useModules();
  const { useGrades } = useModuleGrades(
    moduleData?.id,
    filters?.completed,
    filters?.approven
  );

  useEffect(() => {
    if (modulesQuery.data) setModulesData(modulesQuery.data);
  }, [modulesQuery.data]);

  useEffect(() => {
    if (moduleQuery.data) setModuleData(moduleQuery.data);
  }, [moduleQuery.data]);

  useEffect(() => {
    if (useGrades.data) setGradesData(useGrades.data);
  }, [useGrades.data]);

  useEffect(() => {
    if (selectedId) moduleQuery.refetch();
  }, [selectedId]);

  useEffect(() => {
    if (moduleData?.id) useGrades.refetch();
  }, [moduleData]);

  useEffect(() => {
    if (moduleQuery.data) useGrades.refetch();
  }, [filters]);

  const handleSelectFilter = (value: OptionFilter) => {
    switch (value) {
      case "Aprobadas":
        setFilters({ approven: true });
        return;
      case "No aprobadas":
        setFilters({ approven: false });
        return;
      case "Completados":
        setFilters({ completed: true });
        return;
      case "No completados":
        setFilters({ completed: false });
        return;
    }
  };

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
          {optionFilters.map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                id={`default-radio-${index}`}
                type="radio"
                value={item}
                onChange={() => handleSelectFilter(item)}
                name="default-radio"
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary/50 focus:ring-2"
              />
              <label
                htmlFor={`default-radio-${index}`}
                className="ms-2 text-sm font-medium text-gray-900"
              >
                {item}
              </label>
            </div>
          ))}
          <h2 className="text-secondary font-semibold mb-6">
            Total de registros {gradesData.length}
          </h2>
          {useGrades.isLoading ? (
            <LoaderComponent />
          ) : (
            <div>
              <TableStudents
                grades
                failed={'approven' in filters! ? !filters.approven : false}
                students={gradesData}
                idModule={moduleData.id}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
