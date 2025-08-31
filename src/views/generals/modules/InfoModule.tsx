import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { FaFlagCheckered } from "react-icons/fa6";
import { RiBookOpenLine } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuTableOfContents } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";
import { initFlowbite } from "flowbite";

import { Colors } from "../../../assets/colors";
import {
  useBibliography,
  useContents,
  useObjectives,
} from "../../../presentation/modules/useInfoModules";
import type {
  Bibliography,
  Content,
  Objective,
} from "../../../interfaces/Module";
import {
  ModalComponent,
  type ModalRef,
} from "../../../components/ModalComponent";

interface ModuleInfo {
  objectives: Objective[];
  contents: Content[];
  bibliographies: Bibliography[];
}

interface Inputs {
  objective: string;
  content: string;
  bibliography: string;
}

export const InfoModule = () => {
  const { id } = useParams();
  const idModule = `${id}`;
  const [moduleData, setModuleData] = useState<ModuleInfo>({
    objectives: [],
    contents: [],
    bibliographies: [],
  });
  const [moduleInputs, setModuleInputs] = useState<Inputs>({
    objective: "",
    content: "",
    bibliography: "",
  });
  const modalRef = useRef<ModalRef>(null);
  const { objectivesQuery, objectiveMutation, deleteObjectiveMutation } =
    useObjectives(idModule);
  const { contentsQuery, contentMutation, deleteContentMutation } =
    useContents(idModule);
  const {
    bibliographyQuery,
    bibliographyMutation,
    deleteBibliographyMutation,
  } = useBibliography(idModule);

  useEffect(() => {
    initFlowbite();
  }, []);

  useEffect(() => {
    if (objectivesQuery.data)
      setModuleData((prev) => ({ ...prev, objectives: objectivesQuery.data }));
  }, [objectivesQuery.data]);

  useEffect(() => {
    if (contentsQuery.data)
      setModuleData((prev) => ({ ...prev, contents: contentsQuery.data }));
  }, [contentsQuery.data]);

  useEffect(() => {
    if (bibliographyQuery.data)
      setModuleData((prev) => ({
        ...prev,
        bibliographies: bibliographyQuery.data,
      }));
  }, [bibliographyQuery.data]);

  const handleUpdateObjectives = async () => {
    const newArray: string[] = moduleData.objectives
      .filter((item) => !item.id)
      .map((item) => item.description);

    objectiveMutation.mutate(newArray);
  };

  const handleUpdateContents = async () => {
    const newArray: string[] = moduleData.contents
      .filter((item) => !item.id)
      .map((item) => item.topic);

    contentMutation.mutate(newArray);
  };

  const handleUpdateBibliography = async () => {
    const newArray: string[] = moduleData.bibliographies
      .filter((item) => !item.id)
      .map((item) => item.reference);

    bibliographyMutation.mutate(newArray);
  };

  const handleDeleteObjective = (id?: number) => {
    if (!id) {
      setModuleData((prev) => ({
        ...prev,
        objectives: prev.objectives.filter((item) => item.id !== id),
      }));
    } else {
      deleteObjectiveMutation.mutate({
        id: id.toString(),
        options: 1,
      });
    }
  };

  const handleDeleteContent = (id?: number) => {
    if (!id) {
      setModuleData((prev) => ({
        ...prev,
        contents: prev.contents.filter((item) => item.id !== id),
      }));
    } else {
      deleteContentMutation.mutate({
        id: id.toString(),
        options: 2,
      });
    }
  };

  const handleDeleteBibliography = async (id?: number) => {
    if (!id) {
      setModuleData((prev) => ({
        ...prev,
        bibliographies: prev.bibliographies.filter((item) => item.id !== id),
      }));
    } else {
      await deleteBibliographyMutation.mutateAsync({
        id: id.toString(),
        options: 3,
      });
      modalRef.current?.show();
    }
  };

  return (
    <>
      <ModalComponent
        onAccept={() => console.log("hello")}
        message="El registro se borró exitosamente"
        ref={modalRef}
      />
      <div
        id="accordion-flush"
        data-accordion="open"
        data-active-classes="bg-white text-gray-900"
        data-inactive-classes="text-gray-500"
      >
        <h2 id="accordion-flush-heading-1">
          <button
            type="button"
            onClick={() => objectivesQuery.refetch()}
            className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 gap-3"
            data-accordion-target="#accordion-flush-body-1"
            aria-expanded="false"
            aria-controls="accordion-flush-body-1"
          >
            <div className="flex gap-4">
              <FaFlagCheckered color={Colors.secondary} />
              <span>Objetivos</span>
            </div>
            <MdKeyboardArrowDown size={25} />
          </button>
        </h2>
        <div
          id="accordion-flush-body-1"
          className="hidden"
          aria-labelledby="accordion-flush-heading-1"
        >
          <div className="py-5 border-b border-gray-200">
            <div className="mx-4 flex gap-2 items-center">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
                  placeholder=" "
                  value={moduleInputs.objective}
                  onChange={(e) =>
                    setModuleInputs((prev) => ({
                      ...prev,
                      objective: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Ingresa un objetivo
                </label>
              </div>
              <IoMdAddCircleOutline
                className="cursor-pointer text-secondary hover:text-secondary/60"
                onClick={() => {
                  const newObjective: Objective = {
                    description: moduleInputs.objective,
                    idModule: parseInt(idModule),
                  };
                  if (moduleInputs.objective.trim() !== "") {
                    setModuleData((prev) => ({
                      ...prev,
                      objectives: [...prev.objectives, newObjective],
                    }));
                    setModuleInputs((prev) => ({ ...prev, objective: "" }));
                  }
                }}
                size={30}
              />
            </div>
            {moduleData.objectives.length > 0 && (
              <div className="flex flex-col">
                <p className="text-xs text-primary mb-4">
                  Para eliminar un objetivo, da click sobre el mismo
                </p>
                <ol className="space-y-2 mx-4 list-[lower-roman] list-inside">
                  {moduleData.objectives.map((objective, index) => (
                    <li
                      className="opacity-100 translate-y-0 transition-all duration-300 ease-out"
                      onClick={() => handleDeleteObjective(objective.id)}
                      key={index}
                    >
                      <span>{objective.description}</span>
                    </li>
                  ))}
                </ol>
                <button
                  onClick={handleUpdateObjectives}
                  className="bg-secondary text-white my-4 p-2 rounded-xl place-self-end hover:bg-secondary/60 cursor-pointer"
                >
                  Actualizar Objetivos
                </button>
              </div>
            )}
          </div>
        </div>
        <h2 id="accordion-flush-heading-2">
          <button
            type="button"
            onClick={() => contentsQuery.refetch()}
            className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 gap-3"
            data-accordion-target="#accordion-flush-body-2"
            aria-expanded="false"
            aria-controls="accordion-flush-body-2"
          >
            <div className="flex gap-4">
              <LuTableOfContents color={Colors.secondary} />
              <span>Contenidos</span>
            </div>
            <MdKeyboardArrowDown size={25} />
          </button>
        </h2>
        <div
          id="accordion-flush-body-2"
          className="hidden"
          aria-labelledby="accordion-flush-heading-2"
        >
          <div className="py-5 border-b border-gray-200">
            <div className="mx-4 flex gap-2 items-center">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
                  placeholder=" "
                  value={moduleInputs.content}
                  onChange={(e) =>
                    setModuleInputs((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Ingresa un contenido
                </label>
              </div>
              <IoMdAddCircleOutline
                className="cursor-pointer text-secondary hover:text-secondary/60"
                onClick={() => {
                  const newContent: Content = {
                    topic: moduleInputs.content,
                    idModule: parseInt(idModule),
                  };
                  if (moduleInputs.content.trim() !== "") {
                    setModuleData((prev) => ({
                      ...prev,
                      contents: [...prev.contents, newContent],
                    }));
                    setModuleInputs((prev) => ({ ...prev, content: "" }));
                  }
                }}
                size={30}
              />
            </div>
            {moduleData.contents.length > 0 && (
              <div className="flex flex-col">
                <p className="text-xs text-primary mb-4">
                  Para eliminar un contenido, da click sobre el mismo
                </p>
                <ol className="space-y-2 mx-4 list-[lower-roman] list-inside">
                  {moduleData.contents.map((content, index) => (
                    <li
                      className="opacity-100 translate-y-0 transition-all duration-300 ease-out"
                      onClick={() => handleDeleteContent(content.id)}
                      key={index}
                    >
                      <span>{content.topic}</span>
                    </li>
                  ))}
                </ol>
                <button
                  onClick={handleUpdateContents}
                  className="bg-secondary text-white my-4 p-2 rounded-xl place-self-end hover:bg-secondary/60 cursor-pointer"
                >
                  Actualizar Contenidos
                </button>
              </div>
            )}
          </div>
        </div>
        <h2 id="accordion-flush-heading-3">
          <button
            type="button"
            onClick={() => bibliographyQuery.refetch()}
            className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 gap-3"
            data-accordion-target="#accordion-flush-body-3"
            aria-expanded="false"
            aria-controls="accordion-flush-body-3"
          >
            <div className="flex gap-4">
              <RiBookOpenLine color={Colors.secondary} />
              <span>Bibliografía</span>
            </div>
            <MdKeyboardArrowDown size={25} />
          </button>
        </h2>
        <div
          id="accordion-flush-body-3"
          className="hidden"
          aria-labelledby="accordion-flush-heading-3"
        >
          <div className="py-5 border-b border-gray-200">
            <div className="mx-4 flex gap-2 items-center">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
                  placeholder=" "
                  value={moduleInputs.bibliography}
                  onChange={(e) =>
                    setModuleInputs((prev) => ({
                      ...prev,
                      bibliography: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Ingresa una bibliografía
                </label>
              </div>
              <IoMdAddCircleOutline
                className="cursor-pointer text-secondary hover:text-secondary/60"
                onClick={() => {
                  const newBibliography: Bibliography = {
                    reference: moduleInputs.bibliography,
                    idModule: parseInt(idModule),
                  };
                  if (moduleInputs.bibliography.trim() !== "") {
                    setModuleData((prev) => ({
                      ...prev,
                      bibliographies: [...prev.bibliographies, newBibliography],
                    }));
                    setModuleInputs((prev) => ({ ...prev, bibliography: "" }));
                  }
                }}
                size={30}
              />
            </div>
            {moduleData.bibliographies.length > 0 && (
              <div className="flex flex-col">
                <p className="text-xs text-primary mb-4">
                  Para eliminar una bibliografía, da click sobre la misma
                </p>
                <ol className="space-y-2 mx-4 list-[lower-roman] list-inside">
                  {moduleData.bibliographies.map((bibliography, index) => (
                    <li
                      className="opacity-100 translate-y-0 transition-all duration-300 ease-out"
                      onClick={() => handleDeleteBibliography(bibliography.id)}
                      key={index}
                    >
                      <span>{bibliography.reference}</span>
                    </li>
                  ))}
                </ol>
                <button
                  onClick={handleUpdateBibliography}
                  className="bg-secondary text-white my-4 p-2 rounded-xl place-self-end hover:bg-secondary/60 cursor-pointer"
                >
                  Actualizar Bibliografía
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
