import { useEffect, useState } from "react";
import { ModalAd } from "../../components/ModalReact";
import type { Notice } from "../../interfaces/Notice";
import { useAds } from "../../presentation/ads/useAds";
import { TableNotices } from "../../components/TableComponent";

export const AdsScreen = () => {
  const { adsMutation, adsQuery } = useAds();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [adsList, setAdsList] = useState<Notice[]>([]);

  useEffect(() => {
    if (adsQuery.data) setAdsList(adsQuery.data);
  }, [adsQuery.data]);

  return (
    <div>
      <ModalAd
        onSendData={(data) => adsMutation.mutate({ ad: data as Notice })}
        loading={adsMutation.isPending}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
      <h2 className="text-2xl font-semibold text-center text-secondary">
        Avisos del sistema
      </h2>
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-secondary text-lg font-semibold">
          ¿Desea crear un nuevo aviso?
        </h2>
        <button
          onClick={() => setOpenModal(true)}
          className="text-white font-semibold rounded-xl cursor-pointer bg-secondary hover:bg-secondary/60 p-2"
        >
          Crear nuevo aviso
        </button>
      </div>
      <TableNotices
        general
        notices={adsList}
        onDelete={(id) => adsMutation.mutate({ id: id })}
      />
    </div>
  );
};
