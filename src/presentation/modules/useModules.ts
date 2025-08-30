import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getModules } from "../../core/database/modules/get-modules.action";
import type { Module } from "../../interfaces/Module";
import { createNewModule } from "../../core/database/modules/create-new-module.action";

export const useModules = () => {
  const queryClient = useQueryClient();

  const modulesQuery = useQuery({
    queryKey: ["modules"],
    queryFn: () => getModules(),
    staleTime: 1000 * 60 * 60,
  });

  const moduleMutation = useMutation({
    mutationFn: async (data: Module) => createNewModule(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["modules"],
      }),
        console.log("Modulo creado");
    },

    onError: (error) => {
      throw error
    },
  });

  return { modulesQuery, moduleMutation };
};
