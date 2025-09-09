import { Outlet, useParams } from "react-router";
import { useModule } from "../../../presentation/modules/useModules";
import type { Module } from "../../../interfaces/Module";
import { useEffect, useState } from "react";
import { ButtonGoBack } from "../../../components/ButtonGoBack";
import { BreadCumbComponent } from "../../../components/BreadCumbComponent";
import { ToggleComponent } from "../../../components/ToggleComponent";

export const ModuleScreen = () => {
  const { id } = useParams();
  const { moduleQuery, mutateModule } = useModule(`${id}`);
  const [dataModule, setDataModule] = useState<Module>();

  useEffect(() => {
    if (moduleQuery.data) setDataModule(moduleQuery.data);
  }, [moduleQuery.data]);

  return (
    <div className="relative">
      <ButtonGoBack />
      <h2 className="text-2xl text-center font-semibold text-secondary">
        Conferencia: {dataModule?.number}
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="m-4">
          <h2 className="text-lg">
            <span className="font-semibold text-primary">Profesor:</span>{" "}
            {dataModule?.professor}
          </h2>
          <h2 className="text-lg">
            <span className="font-semibold text-primary">Título:</span>{" "}
            {dataModule?.title}
          </h2>
        </div>
        <div className="flex items-center gap-4 mt-2 ml-4">
          <ToggleComponent
            id={`${id}`}
            checked={dataModule?.status ? dataModule.status : false}
            onChange={(value) => mutateModule.mutate({ id: id!, value })}
          />
          <p className="font-semibold text-secondary">
            {dataModule?.status ? "Habilitado" : "Deshabilitado"}
          </p>
        </div>
      </div>
      <BreadCumbComponent />
      <Outlet />
    </div>
  );
};
