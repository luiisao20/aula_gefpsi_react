import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAd,
  getAds,
  getLastAd,
  insertAd,
  insertNotification,
} from "../../core/database/ads/get-ads.action";
import type { Notice } from "../../interfaces/Notice";

export const useAds = () => {
  const queryClient = useQueryClient();

  const adsQuery = useQuery({
    queryKey: ["ads"],
    queryFn: () => getAds(),
    staleTime: 1000 * 60 * 60,
  });

  const adsMutation = useMutation({
    mutationFn: ({ ad, id }: { ad?: Notice; id?: number }) =>
      id ? deleteAd(id) : insertAd(ad!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ads"],
      });
      alert("Avisos actualizados!");
    },

    onError: (message) => {
      alert(`Ha ocurrido un error! ${message}`);
    },
  });

  return { adsQuery, adsMutation };
};

export const useNotifications = (userId?: string) => {
  const queryClient = useQueryClient();

  const queryNotification = useQuery({
    queryFn: () => getLastAd(userId!),
    queryKey: ["notifications"],
    enabled: !!userId,
    retry: 1,
  });

  const notificationsMutation = useMutation({
    mutationFn: (noticeId: number) => insertNotification(userId!, noticeId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      console.log("exito");
    },

    onError: (error) => {
      console.log(error);
    },
  });

  return { queryNotification, notificationsMutation };
};
