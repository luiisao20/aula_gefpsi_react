import { useEffect, useState } from "react";
import type { Student } from "../../../interfaces/Students";
import { useStudents } from "../../../presentation/student/useStudent";
import { TableStudents } from "../../../components/TableComponent";

export const GradesStudents = () => {
  const [dataStudents, setDataStudents] = useState<Student[]>([]);

  const { studentsQuery } = useStudents();

  useEffect(() => {
    if (studentsQuery.data) setDataStudents(studentsQuery.data);
  }, [studentsQuery.data]);

  return (
    <div>
      <TableStudents students={dataStudents} module />
    </div>
  );
};
