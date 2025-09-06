import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getModules } from "../../core/database/modules/get-modules.action";
import type { Module } from "../../interfaces/Module";
import {
  createNewModule,
  publishModule,
} from "../../core/database/modules/create-new-module.action";
import { getModuleInfo } from "../../core/database/modules/get-module-info.action";

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
      throw error;
    },
  });

  return { moduleMutation, modulesQuery };
};

export const useModule = (id?: string) => {
  const queryClient = useQueryClient();

  const moduleQuery = useQuery({
    queryKey: ["module", id],
    queryFn: () => getModuleInfo(id!),
    staleTime: 1000 * 60 * 60,
    enabled: !!id
  });

  const mutateModule = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: boolean }) =>
      await publishModule(id, value),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["module", id],
      });
      alert('La conferencia se ha actualizado con exito!');
    },

    onError: (error) => console.log(error),
  });

  return { moduleQuery, mutateModule };
};
