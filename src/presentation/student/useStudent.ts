import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllStudents,
  getExamByStudent,
  getGradeByStudent,
  getStudent,
  searchStudents,
  updateGradeQuestionsByStudent,
} from "../../core/database/students/students.action";
import type { GradesByQuestion } from "../../views/generals/students/StudentExam";
import {
  createUser,
  getUser,
  updateBiography,
} from "../../core/database/users/user.action";

export const useStudents = (searchText: string) => {
  const studentsQuery = useQuery({
    queryFn: () =>
      searchText.length > 0
        ? searchStudents(searchText)
        : getAllStudents(),
    queryKey: ["students", searchText],
    staleTime: 1000 * 60 * 60,
  });

  return { studentsQuery };
};

export const useStudentInfo = (idStudent: string) => {
  const studentInfoQuery = useQuery({
    queryFn: () => getStudent(idStudent),
    queryKey: ["studentInfo", idStudent],
    staleTime: 1000 * 60 * 60,
  });

  return { studentInfoQuery };
};

export const useStudent = (idStudent?: string) => {
  const queryClient = useQueryClient();

  const studentQuery = useQuery({
    queryFn: () => getUser(idStudent!),
    queryKey: ["student", idStudent],
    staleTime: 1000 * 60 * 60,
    enabled: !!idStudent,
  });

  const studentCreateMutation = useMutation({
    mutationFn: ({
      firstName,
      lastName,
    }: {
      firstName: string;
      lastName: string;
    }) => createUser(firstName, lastName, idStudent!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student", idStudent],
      });

      alert("Usuario creado");
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const studentMutation = useMutation({
    mutationFn: (biography: string) => updateBiography(biography, idStudent!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student", idStudent],
      });

      alert("Biografía actualiada");
    },

    onError: (error) => {
      console.log(error);
    },
  });

  return { studentQuery, studentMutation, studentCreateMutation };
};

export const useAnswers = (idStudent: string, idExam: string) => {
  const queryClient = useQueryClient();

  const answersQuery = useQuery({
    queryFn: () => getExamByStudent(idStudent, idExam),
    queryKey: ["answers", idStudent, idExam],
    staleTime: 1000 * 60 * 60,
    enabled: !!idExam && !!idStudent,
  });

  const answersMutation = useMutation({
    mutationFn: async ({
      grades,
      totalGrade,
      update,
      idModule,
    }: {
      grades: GradesByQuestion[];
      totalGrade: number;
      update?: boolean;
      idModule: string;
    }) =>
      await updateGradeQuestionsByStudent(
        idStudent,
        idExam,
        grades,
        totalGrade,
        update ?? false,
        idModule
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["answers", idStudent, idExam],
      });
      queryClient.invalidateQueries({
        queryKey: ["grade", idStudent, idExam],
      });
      alert("La calificación se subió con éxito");
    },

    onError: (err) => {
      console.log(err);
    },
  });

  return { answersQuery, answersMutation };
};

export const useGrade = (idStudent: string, idExam: string) => {
  const gradeQuery = useQuery({
    queryFn: () => getGradeByStudent(idStudent, idExam),
    queryKey: ["grade", idStudent, idExam],
    staleTime: 1000 * 60 * 60,
    enabled: !!idExam && !!idStudent,
    retry: false,
  });

  return { gradeQuery };
};
