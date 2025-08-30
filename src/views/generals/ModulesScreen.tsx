import { useEffect, useRef, useState } from "react";
import { FaBook } from "react-icons/fa";

import { ModalForm, type ModalRef } from "../../components/ModalComponent";
import type { Module } from "../../interfaces/Module";
import { useModules } from "../../presentation/modules/useModules";
import { Link } from "react-router";
import { GoArrowRight } from "react-icons/go";
import { Colors } from "../../assets/colors";

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
      <div className="flex flex-col space-y-4 my-4">
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
