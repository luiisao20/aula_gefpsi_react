import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useModule } from "../../../presentation/modules/useModules";
import type {
  ExtraContent,
  Module,
  VideoConference,
} from "../../../interfaces/Module";
import {
  useContents,
  useExtraContent,
  useVideoConference,
} from "../../../presentation/modules/useInfoModules";

export const ModuleInfoStudent = () => {
  const { id } = useParams();
  const idModule = `${id}`;
  const [moduleData, setModuleData] = useState<Module>();
  const [contentData, setContentData] = useState<string>("");
  const [videoConference, setVideoConference] = useState<VideoConference>();
  const [extraContentList, setExtraContentList] = useState<ExtraContent[]>([]);

  const { moduleQuery } = useModule(idModule);
  const { contentQuery } = useContents(idModule);
  const { videoConferenceQuery } = useVideoConference(idModule);
  const { extraContentQuery } = useExtraContent(idModule);

  useEffect(() => {
    contentQuery.refetch();
  }, []);

  useEffect(() => {
    videoConferenceQuery.refetch();
  }, []);

  useEffect(() => {
    extraContentQuery.refetch();
  }, []);

  useEffect(() => {
    if (extraContentQuery.data) setExtraContentList(extraContentQuery.data);
  }, [extraContentQuery.data]);

  useEffect(() => {
    if (contentQuery.data) setContentData(contentQuery.data.topic);
  }, [contentQuery.data]);

  useEffect(() => {
    if (videoConferenceQuery.data)
      setVideoConference(videoConferenceQuery.data);
  }, [videoConferenceQuery.data]);

  useEffect(() => {
    if (moduleQuery.data) setModuleData(moduleQuery.data);
  }, [moduleQuery.data]);

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-center text-secondary">
        Conferencia {moduleData?.number}
      </h2>
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl">
          <span className="font-semibold text-secondary"> Título:</span>{" "}
          {moduleData?.title}
        </h2>
        <h2 className="text-xl">
          <span className="font-semibold text-secondary"> Profesor:</span>{" "}
          {moduleData?.professor}
        </h2>
      </div>
      <h2 className="text-lg font-semibold text-secondary mt-4">Resumen:</h2>
      <p className="whitespace-pre-line text-base text-justify mx-4">
        {contentData}
      </p>
      <h2
        onClick={() => window.open(videoConference?.url, "_blank")}
        className="text-lg font-semibold text-secondary mt-4 underline underline-offset-2 cursor-pointer"
      >
        Ingresa al link de la grabación haciendo clic aquí.
      </h2>
      <h2 className="text-lg font-semibold text-secondary mt-4">
        Échale un vistazo al contenido extra.
      </h2>
      <ol className="list-[lower-roman] list-inside my-4 space-y-2 mx-4">
        {extraContentList.map((item) => (
          <li
            onClick={() => window.open(item.url, "_blank")}
            className="opacity-100 translate-y-0 transition-all duration-300 ease-out cursor-pointer"
            key={item.id}
          >
            <span className="underline underline-offset-2">
              {item.description}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};
