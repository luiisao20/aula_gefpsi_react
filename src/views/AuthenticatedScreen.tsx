import { useEffect, useState } from "react";
import type { Student } from "../interfaces/Students";
import { useAuthStore } from "../presentation/auth/useAuthStore";
import { useStudent } from "../presentation/student/useStudent";
import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router";
import { LoaderComponent } from "../components/SpinnerComponent";

export const AuthenticatedScreen = () => {
  const [userData, setUserData] = useState<Student>();

  const { user, logout, loading } = useAuthStore();

  const { studentQuery } = useStudent(user?.id);

  useEffect(() => {
    if (studentQuery.data) setUserData(studentQuery.data);
  }, [studentQuery.data]);

  return (
    <div>
      {studentQuery.isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <Navbar
            admin={userData?.admin}
            onLogout={logout}
            loadingLogut={loading}
          />
          <Outlet />
        </>
      )}
    </div>
  );
};
