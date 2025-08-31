import { useParams } from "react-router";
import { useModule } from "../../../presentation/modules/useModules";
import type { Module } from "../../../interfaces/Module";
import { useEffect, useState } from "react";
import { ButtonGoBack } from "../../../components/ButtonGoBack";
import { AccordionModule } from "../../../components/Accordion";

export const ModuleScreen = () => {
  const { id } = useParams();
  const { moduleQuery } = useModule(`${id}`);
  const [dataModule, setDataModule] = useState<Module>();

  useEffect(() => {
    if (moduleQuery.data) setDataModule(moduleQuery.data);
  }, [moduleQuery.data]);

  return (
    <div className="relative">
      <ButtonGoBack />
      <h2 className="text-2xl text-center font-semibold text-secondary">
        Módulo: {dataModule?.number}
      </h2>
      <div className="m-4">
        <h2 className="text-lg">
          <span className="font-semibold text-primary">Materia:</span>{" "}
          {dataModule?.subject}
        </h2>
        <h2 className="text-lg">
          <span className="font-semibold text-primary">Profesor:</span>{" "}
          {dataModule?.professor}
        </h2>
        <h2 className="text-lg">
          <span className="font-semibold text-primary">Título:</span>{" "}
          {dataModule?.title}
        </h2>
      </div>
      <AccordionModule idModule={`${id}`} />
    </div>
  );
};
