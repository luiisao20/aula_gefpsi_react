import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Bibliography } from "../../../interfaces/Module";
import { useBibliography } from "../../../presentation/modules/useInfoModules";

export const ModuleBibliographyStudent = () => {
  const { id } = useParams();
  const [dataBibliography, setDataBibliography] = useState<Bibliography[]>([]);
  const { bibliographyQuery } = useBibliography(`${id}`);

  useEffect(() => {
    bibliographyQuery.refetch();
  }, []);

  useEffect(() => {
    if (bibliographyQuery.data) setDataBibliography(bibliographyQuery.data);
  }, [bibliographyQuery.data]);

  return (
    <div>
      <h2 className="font-semibold text-center text-secondary text-2xl mb-4">
        Textos de consulta
      </h2>
      <ol className="list-[lower-roman] list-inside px-4 space-y-3 mb-4">
        {dataBibliography.map((item) => (
          <li key={item.id}>{item.reference}</li>
        ))}
      </ol>
    </div>
  );
};
