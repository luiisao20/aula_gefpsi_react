import { useEffect, useState } from "react";
import type { Student } from "../../interfaces/Students";
import { useStudents } from "../../presentation/student/useStudent";
import { TableStudents } from "../../components/TableComponent";

export const StudentsScreen = () => {
  const [dataStudents, setDataStudents] = useState<Student[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const { studentsQuery } = useStudents(searchText);

  useEffect(() => {
    if (studentsQuery.data) setDataStudents(studentsQuery.data);
  }, [studentsQuery.data]);

  return (
    <div>
      <TableStudents
        students={dataStudents}
        search={searchText}
        onChangeSearch={setSearchText}
      />
    </div>
  );
};
