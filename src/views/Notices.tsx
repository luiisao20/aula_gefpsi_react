import { useEffect, useState } from "react";

import { TableNotices } from "../components/TableComponent";
import type { Notice } from "../interfaces/Notice";
import { useAds, useNotifications } from "../presentation/ads/useAds";
import { useAuthStore } from "../presentation/auth/useAuthStore";

export const NoticesScreen = () => {
  const { user } = useAuthStore();

  const [ads, setAds] = useState<Notice[]>([]);

  const { adsQuery } = useAds();
  const { notificationsMutation } = useNotifications(user?.id);

  useEffect(() => {
    if (adsQuery.data) setAds(adsQuery.data);
  }, [adsQuery.data]);

  useEffect(() => {
    if (ads.length > 0) notificationsMutation.mutate(ads[0].id!);
  }, [ads]);

  if (adsQuery.isLoading) {
    return <h1>Cargando</h1>;
  }

  return (
    <div className="my-20 md:w-1/2 mx-auto">
      <h1 className="text-center text-xl font-semibold">Anuncios</h1>
      {ads.length > 0 ? (
        <TableNotices notices={ads!} />
      ) : (
        <h2 className="font-semibold text-center text-xl">
          No existen anuncios publicados
        </h2>
      )}
    </div>
  );
};
