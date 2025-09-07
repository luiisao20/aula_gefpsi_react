import { useEffect, useState } from "react";

import { TableNotices } from "../components/TableComponent";
import type { Notice } from "../interfaces/Notice";
import { useAds } from "../presentation/ads/useAds";

export const NoticesScreen = () => {
  const [ads, setAds] = useState<Notice[]>([]);

  const { adsQuery } = useAds();

  useEffect(() => {
    if (adsQuery.data) setAds(adsQuery.data);
  }, [adsQuery.data]);

  if (adsQuery.isLoading) {
    return <h1>Cargando</h1>;
  }

  return (
    <div className="my-20 md:w-1/2 mx-auto">
      <h1 className="text-center text-xl font-semibold">Anuncios</h1>
      {ads.length < 0 ? (
        <TableNotices notices={ads!} />
      ) : (
        <h2 className="font-semibold text-center text-xl">
          No existen anuncios publicados
        </h2>
      )}
    </div>
  );
};
