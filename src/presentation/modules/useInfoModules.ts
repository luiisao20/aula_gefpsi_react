import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getBibliographyByModule,
  getContentsByModule,
  getExtraContentByModule,
  getObjectivesByModule,
  getVideoConferenceByModule,
} from "../../core/database/modules/get-module-info.action";

import {
  insertBibliographyByModule,
  insertContentsByModule,
  insertExtraContentByModule,
  insertObjectivesByModule,
  insertVideoConferenceByModule,
} from "../../core/database/modules/insert-info-by-module.action";
import { deleteInfoFromModule } from "../../core/database/modules/delete-info-by-modules.action";
import type { ExtraContent } from "../../interfaces/Module";

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
      alert(response.message);
    },

    onError: (error: any) => {
      const message = error.response?.data?.error || "Error desconocido";
      console.log(message);
    },
  });

  const deleteObjectiveMutation = useMutation({
    mutationFn: deleteInfoFromModule,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["objectives", idModule],
      });
      objectivesQuery.refetch();
      alert("Contenido borrado exitosamente");
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

  const contentQuery = useQuery({
    queryKey: ["content", idModule],
    queryFn: () => getContentsByModule(idModule),
    enabled: false,
    staleTime: 1000 * 60 * 60,
  });

  const contentMutation = useMutation({
    mutationFn: async (data: string) => insertContentsByModule(idModule, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["content", idModule],
      });
      contentQuery.refetch();
      alert("Resumen subido con éxito");
    },

    onError: (error: any) => {
      const message = error.response?.data?.error || "Error desconocido";
      console.log(message);
    },
  });

  const deleteContentMutation = useMutation({
    mutationFn: deleteInfoFromModule,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["content", idModule],
      });
      contentQuery.refetch();
      alert("Contenido borrado exitosamente");
    },

    onError: (error: any) => {
      const message = error.response?.data?.error || "Error desconocido";
      console.log(message);
    },
  });

  return { contentQuery, contentMutation, deleteContentMutation };
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

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bibliography", idModule],
      });

      alert('Contenido ingresado');
    },

    onError: (error: any) => {
      const message = error.response?.data?.error || "Error desconocido";
      console.log(message);
    },
  });

  const deleteBibliographyMutation = useMutation({
    mutationFn: deleteInfoFromModule,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bibliography", idModule],
      });
      bibliographyQuery.refetch();
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

export const useVideoConference = (idModule: number) => {
  const queryClient = useQueryClient();

  const videoConferenceQuery = useQuery({
    queryKey: ["videoConference", idModule],
    queryFn: () => getVideoConferenceByModule(idModule),
    enabled: false,
    staleTime: 1000 * 60 * 60,
  });

  const videoConferenceMutation = useMutation({
    mutationFn: async (url: string) =>
      insertVideoConferenceByModule(idModule, url),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videoConference", idModule],
      });
      videoConferenceQuery.refetch();
      alert("Videoconferencia insertada con exito!");
    },

    onError: (error: any) => {
      const message = error.response?.data?.error || "Error desconocido";
      console.log(message);
    },
  });

  const deleteVideoConferenceMutation = useMutation({
    mutationFn: deleteInfoFromModule,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videoConference", idModule],
      });
      videoConferenceQuery.refetch();
      alert("Contenido borrado exitosamente");
    },

    onError: (error: any) => {
      const message = error.response?.data?.error || "Error desconocido";
      console.log(message);
    },
  });

  return {
    videoConferenceQuery,
    videoConferenceMutation,
    deleteVideoConferenceMutation,
  };
};

export const useExtraContent = (idModule: string) => {
  const queryClient = useQueryClient();

  const extraContentQuery = useQuery({
    queryKey: ["extraContent", idModule],
    queryFn: () => getExtraContentByModule(idModule),
    enabled: false,
    staleTime: 1000 * 60 * 60,
  });

  const extraContentMutation = useMutation({
    mutationFn: async (data: ExtraContent[]) =>
      insertExtraContentByModule(idModule, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["extraContent", idModule],
      });
      extraContentQuery.refetch();
      alert("Contenido borrado exitosamente");
    },

    onError: (error: any) => {
      const message = error.response?.data?.error || "Error desconocido";
      console.log(message);
    },
  });

  const deleteExtraContentMutation = useMutation({
    mutationFn: deleteInfoFromModule,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["extraContent", idModule],
      });
      extraContentQuery.refetch();
    },

    onError: (error: any) => {
      const message = error.response?.data?.error || "Error desconocido";
      console.log(message);
    },
  });

  return {
    extraContentMutation,
    extraContentQuery,
    deleteExtraContentMutation,
  };
};
