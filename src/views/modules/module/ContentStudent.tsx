import { useEffect, useState } from "react";
import type { Content } from "../../../interfaces/Module";
import { useContents } from "../../../presentation/modules/useInfoModules";
import { useParams } from "react-router";

export const ModuleContentStudent = () => {
  const { id } = useParams();
  const [dataContent, setDataContent] = useState<Content[]>([]);
  const { contentsQuery } = useContents(`${id}`);

  useEffect(() => {
    contentsQuery.refetch();
  }, []);

  useEffect(() => {
    if (contentsQuery.data) setDataContent(contentsQuery.data);
  }, [contentsQuery.data]);

  return (
    <div>
      <h2 className="font-semibold text-center text-secondary text-2xl mb-4">
        Contenidos del módulo
      </h2>
      <ol className="list-[lower-roman] list-inside px-4 space-y-3 mb-4">
        {dataContent.map((item) => (
          <li key={item.id}>{item.topic}</li>
        ))}
      </ol>
    </div>
  );
};
