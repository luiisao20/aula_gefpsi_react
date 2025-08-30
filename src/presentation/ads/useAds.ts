import { useQuery } from "@tanstack/react-query";
import { getAds } from "../../core/database/ads/get-ads.action";

export const useAds = () => {
  const adsQuery = useQuery({
    queryKey: ["ads"],
    queryFn: () => getAds(),
    staleTime: 1000 * 60 * 60,
  });

  return { adsQuery };
};
