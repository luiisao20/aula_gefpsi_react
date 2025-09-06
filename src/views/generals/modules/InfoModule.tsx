import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { FaVideo } from "react-icons/fa6";
import { RiBookOpenLine } from "react-icons/ri";
import { MdDeleteForever, MdKeyboardArrowDown } from "react-icons/md";
import { LuTableOfContents } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";
import { initFlowbite } from "flowbite";

import { Colors } from "../../../assets/colors";
import {
  useBibliography,
  useContents,
  useExtraContent,
  useVideoConference,
} from "../../../presentation/modules/useInfoModules";
import type {
  Bibliography,
  Content,
  ExtraContent,
  Objective,
  VideoConference,
} from "../../../interfaces/Module";
import {
  ModalComponent,
  type ModalRef,
} from "../../../components/ModalComponent";
import { CiTextAlignLeft } from "react-icons/ci";

interface ModuleInfo {
  objectives: Objective[];
  content?: Content;
  bibliographies: Bibliography[];
  videoConference?: VideoConference;
  extraContent: ExtraContent[];
}

interface Inputs {
  objective: string;
  content: string;
  bibliography: string;
  url: string;
}

interface ExtraContentInput {
  description: string;
  url: string;
}

export const InfoModule = () => {
  const { id } = useParams();
  const idModule = `${id}`;

  const [moduleData, setModuleData] = useState<ModuleInfo>({
    objectives: [],
    bibliographies: [],
    extraContent: [],
  });
  const [moduleInputs, setModuleInputs] = useState<Inputs>({
    objective: "",
    content: "",
    bibliography: "",
    url: "",
  });
  const [extraContent, setExtraContent] = useState<ExtraContentInput>({
    description: "",
    url: "",
  });

  const modalRef = useRef<ModalRef>(null);

  const {
    videoConferenceQuery,
    videoConferenceMutation,
    deleteVideoConferenceMutation,
  } = useVideoConference(parseInt(idModule));
  const { contentQuery, contentMutation, deleteContentMutation } =
    useContents(idModule);
  const {
    bibliographyQuery,
    bibliographyMutation,
    deleteBibliographyMutation,
  } = useBibliography(idModule);
  const {
    deleteExtraContentMutation,
    extraContentMutation,
    extraContentQuery,
  } = useExtraContent(idModule);

  useEffect(() => {
    initFlowbite();
  }, []);

  useEffect(() => {
    if (videoConferenceQuery.data)
      setModuleData((prev) => ({
        ...prev,
        videoConference: videoConferenceQuery.data,
      }));
  }, [videoConferenceQuery.data]);

  useEffect(() => {
    if (contentQuery.data)
      setModuleData((prev) => ({ ...prev, content: contentQuery.data }));
  }, [contentQuery.data]);

  useEffect(() => {
    if (bibliographyQuery.data)
      setModuleData((prev) => ({
        ...prev,
        bibliographies: bibliographyQuery.data,
      }));
  }, [bibliographyQuery.data]);

  useEffect(() => {
    if (extraContentQuery.data)
      setModuleData((prev) => ({
        ...prev,
        extraContent: extraContentQuery.data,
      }));
  }, [extraContentQuery.data]);

  const handleUpdateBibliography = async () => {
    const newArray: string[] = moduleData.bibliographies
      .filter((item) => !item.id)
      .map((item) => item.reference);

    bibliographyMutation.mutate(newArray);
  };

  const handleUpdateExtraContent = async () => {
    const newArray: ExtraContent[] = moduleData.extraContent
      .filter((item) => !item.id)
      .map((item) => ({
        description: item.description,
        url: item.url,
      }));

    extraContentMutation.mutate(newArray);
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

  const handleDeleteExtraContent = async (id?: number) => {
    if (!id) {
      setModuleData((prev) => ({
        ...prev,
        extraContent: prev.extraContent.filter((item) => item.id !== id),
      }));
    } else {
      await deleteExtraContentMutation.mutateAsync({
        id: id.toString(),
        options: 5,
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
            onClick={() => videoConferenceQuery.refetch()}
            className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 gap-3"
            data-accordion-target="#accordion-flush-body-1"
            aria-expanded="false"
            aria-controls="accordion-flush-body-1"
          >
            <div className="flex gap-4">
              <FaVideo color={Colors.secondary} />
              <span>VideoConferencia</span>
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
            {moduleData.videoConference?.id ? (
              <div className="mx-4 flex justify-between items-center">
                <h2>
                  Enlace a la vídeo conferencia:{" "}
                  <span
                    onClick={() =>
                      window.open(moduleData.videoConference?.url, "_blank")
                    }
                    className="text-secondary underline underline-offset-2 cursor-pointer"
                  >
                    Link
                  </span>
                </h2>
                <button
                  disabled={deleteVideoConferenceMutation.isPending}
                  onClick={() =>
                    deleteVideoConferenceMutation.mutate({
                      options: 4,
                      id: moduleData.videoConference?.id?.toString()!,
                    })
                  }
                  className="cursor-pointer"
                >
                  <MdDeleteForever className="text-3xl text-danger" />
                </button>
              </div>
            ) : (
              <div className="mx-4 flex flex-col">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="floating_video_conference"
                    id="floating_video_conference"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
                    placeholder=" "
                    value={moduleInputs.url}
                    onChange={(e) =>
                      setModuleInputs((prev) => ({
                        ...prev,
                        url: e.target.value,
                      }))
                    }
                  />
                  <label
                    htmlFor="floating_video_conference"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Ingresa el link de la vídeo conferencia
                  </label>
                </div>
                <button
                  onClick={() =>
                    videoConferenceMutation.mutate(moduleInputs.url)
                  }
                  className="place-self-end p-2 bg-secondary hover:bg-secondary/60 rounded-xl text-white font-semibold cursor-pointer"
                >
                  Agregar
                </button>
              </div>
            )}
          </div>
        </div>
        <h2 id="accordion-flush-heading-2">
          <button
            type="button"
            onClick={() => contentQuery.refetch()}
            className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 gap-3"
            data-accordion-target="#accordion-flush-body-2"
            aria-expanded="false"
            aria-controls="accordion-flush-body-2"
          >
            <div className="flex gap-4">
              <CiTextAlignLeft color={Colors.secondary} />
              <span>Resumen</span>
            </div>
            <MdKeyboardArrowDown size={25} />
          </button>
        </h2>
        <div
          id="accordion-flush-body-2"
          className="hidden"
          aria-labelledby="accordion-flush-heading-2"
        >
          {moduleData.content?.id ? (
            <div className="flex flex-col">
              <p className="whitespace-pre-line text-base my-4 text-justify mx-4">
                {moduleData.content.topic}
              </p>
              <button
                disabled={deleteContentMutation.isPending}
                onClick={() =>
                  deleteContentMutation.mutate({
                    options: 2,
                    id: moduleData.content?.id?.toString()!,
                  })
                }
                className="cursor-pointer place-self-end"
              >
                <MdDeleteForever className="text-3xl text-danger" />
              </button>
            </div>
          ) : (
            <div>
              <div className="py-5 border-b border-gray-200">
                <div className="px-4 py-2 bg-white rounded-t-lg">
                  <textarea
                    value={moduleInputs.content}
                    onChange={(e) =>
                      setModuleInputs((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    id="resume"
                    rows={6}
                    className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0"
                    placeholder="Ingresa un resumen de la conferencia"
                  ></textarea>
                </div>
                <div className="flex items-center justify-end px-3 py-2 border-t">
                  <button
                    disabled={contentMutation.isPending}
                    onClick={() => contentMutation.mutate(moduleInputs.content)}
                    className="place-self-end p-2 bg-secondary hover:bg-secondary/60 rounded-xl text-white font-semibold cursor-pointer"
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <h2 id="accordion-flush-heading-3">
          <button
            type="button"
            onClick={() => extraContentQuery.refetch()}
            className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 gap-3"
            data-accordion-target="#accordion-flush-body-3"
            aria-expanded="false"
            aria-controls="accordion-flush-body-3"
          >
            <div className="flex gap-4">
              <LuTableOfContents color={Colors.secondary} />
              <span>Contenido de apoyo</span>
            </div>
            <MdKeyboardArrowDown size={25} />
          </button>
        </h2>
        <div
          id="accordion-flush-body-3"
          className="hidden"
          aria-labelledby="accordion-flush-heading-3"
        >
          <div className="mx-4 flex flex-col mt-4 items-center">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_extra_content"
                id="floating_extra_content"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
                placeholder=" "
                value={extraContent.description}
                onChange={(e) =>
                  setExtraContent((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <label
                htmlFor="floating_extra_content"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Ingresa una breve descripcion del contenido
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_extra_url"
                id="floating_extra_url"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
                placeholder=" "
                value={extraContent.url}
                onChange={(e) =>
                  setExtraContent((prev) => ({
                    ...prev,
                    url: e.target.value,
                  }))
                }
              />
              <label
                htmlFor="floating_extra_url"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Ingresa un link
              </label>
            </div>
            <IoMdAddCircleOutline
              className="cursor-pointer text-secondary hover:text-secondary/60"
              onClick={() => {
                const content: ExtraContent = {
                  url: extraContent.url,
                  description: extraContent.description,
                  idModule: parseInt(idModule),
                };
                if (
                  extraContent.description.trim() !== "" &&
                  extraContent.url.trim() !== ""
                ) {
                  setModuleData((prev) => ({
                    ...prev,
                    extraContent: [...prev.extraContent, content],
                  }));
                  setExtraContent({ description: "", url: "" });
                }
              }}
              size={30}
            />
          </div>
          {moduleData.extraContent.length > 0 && (
            <div className="flex flex-col">
              <p className="text-xs text-primary mb-4">
                Para eliminar un contenido, da click sobre el botón rojo
              </p>
              <ol className="space-y-2 mx-4 mb-4">
                {moduleData.extraContent.map((extraContent, index) => (
                  <li
                    className="opacity-100 translate-y-0 transition-all duration-300 ease-out flex justify-between items-center"
                    key={index}
                  >
                    <p
                      onClick={() => window.open(extraContent.url, "_blank")}
                      className="cursor-pointer"
                    >
                      <span className="mr-2">{index + 1}.</span>
                      <span className="underline underline-offset-2">
                        {extraContent.description}
                      </span>
                    </p>
                    <MdDeleteForever
                      className="text-3xl text-danger cursor-pointer"
                      onClick={() => handleDeleteExtraContent(extraContent.id)}
                    />
                  </li>
                ))}
              </ol>
              <button
                onClick={handleUpdateExtraContent}
                className="bg-secondary text-white my-4 p-2 rounded-xl place-self-end hover:bg-secondary/60 cursor-pointer"
              >
                Actualizar Contenido Extra
              </button>
            </div>
          )}
        </div>
        <h2 id="accordion-flush-heading-4">
          <button
            type="button"
            onClick={() => bibliographyQuery.refetch()}
            className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 gap-3"
            data-accordion-target="#accordion-flush-body-4"
            aria-expanded="false"
            aria-controls="accordion-flush-body-4"
          >
            <div className="flex gap-4">
              <RiBookOpenLine color={Colors.secondary} />
              <span>Bibliografía</span>
            </div>
            <MdKeyboardArrowDown size={25} />
          </button>
        </h2>
        <div
          id="accordion-flush-body-4"
          className="hidden"
          aria-labelledby="accordion-flush-heading-4"
        >
          <div className="py-5 border-b border-gray-200">
            <div className="mx-4 flex gap-2 items-center">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="floating_bibliography"
                  id="floating_bibliography"
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
                  htmlFor="floating_bibliography"
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
