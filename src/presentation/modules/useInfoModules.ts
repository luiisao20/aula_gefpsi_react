import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBibliographyByModule,
  getContentsByModule,
  getObjectivesByModule,
} from "../../core/database/modules/get-module-info.action";
import {
  insertBibliographyByModule,
  insertContentsByModule,
  insertObjectivesByModule,
} from "../../core/database/modules/insert-info-by-module.action";
import { deleteInfoFromModule } from "../../core/database/modules/delete-info-by-modules.action";

export const useObjectives = (idModule: string) => {
  const queryClient = useQueryClient();

  const objectivesQuery = useQuery({
    queryKey: ["objectives", idModule],
    queryFn: () => getObjectivesByModule(idModule),
    enabled: false,
    staleTime: 1000 * 60 * 60,
  });

  const objectiveMutation = useMutation({
    mutationFn: async (data: string[]) =>
      insertObjectivesByModule(idModule, data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["objectives", idModule],
      });
      console.log(response.message);
    },

    onError: (error: any) => {
      const message = error.response?.data?.error || "Error desconocido";
      console.log(message);
    },
  });

  const deleteObjectiveMutation = useMutation({
    mutationFn: deleteInfoFromModule,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["objectives", idModule],
      });
      objectivesQuery.refetch();
      console.log(response.message);
    },

    onError: (error: any) => {
      const message = error.response?.data?.error || "Error desconocido";
      console.log(message);
    },
  });

  return { objectivesQuery, objectiveMutation, deleteObjectiveMutation };
};

export const useContents = (idModule: string) => {
  const queryClient = useQueryClient();
  const contentsQuery = useQuery({
    queryKey: ["contents", idModule],
    queryFn: () => getContentsByModule(idModule),
    enabled: false,
    staleTime: 1000 * 60 * 60,
  });

  const contentMutation = useMutation({
    mutationFn: async (data: string[]) =>
      insertContentsByModule(idModule, data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["contents", idModule],
      });

      console.log(response.message);
    },

    onError: (error: any) => {
      const message = error.response?.data?.error || "Error desconocido";
      console.log(message);
    },
  });

  const deleteContentMutation = useMutation({
    mutationFn: deleteInfoFromModule,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["contents", idModule],
      });
      contentsQuery.refetch();
      console.log(response.message);
    },

    onError: (error: any) => {
      const message = error.response?.data?.error || "Error desconocido";
      console.log(message);
    },
  });

  return { contentsQuery, contentMutation, deleteContentMutation };
};

export const useBibliography = (idModule: string) => {
  const queryClient = useQueryClient();

  const bibliographyQuery = useQuery({
    queryKey: ["bibliography", idModule],
    queryFn: () => getBibliographyByModule(idModule),
    enabled: false,
    staleTime: 1000 * 60 * 60,
  });

  const bibliographyMutation = useMutation({
    mutationFn: async (data: string[]) =>
      insertBibliographyByModule(idModule, data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["bibliography", idModule],
      });

      console.log(response.message);
    },

    onError: (error: any) => {
      const message = error.response?.data?.error || "Error desconocido";
      console.log(message);
    },
  });

  const deleteBibliographyMutation = useMutation({
    mutationFn: deleteInfoFromModule,

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["bibliography", idModule],
      });
      bibliographyQuery.refetch()
      console.log(response.message);
    },

    onError: (error: any) => {
      const message = error.response?.data?.error || "Error desconocido";
      console.log(message);
    },
  });

  return {
    bibliographyQuery,
    bibliographyMutation,
    deleteBibliographyMutation,
  };
};
