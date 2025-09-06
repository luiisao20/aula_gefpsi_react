import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import Login from "./views/Login";
import { HomeScreen } from "./views/Home";
import { ProfileIndex } from "./views/profile";

import { Password } from "./views/profile/Password";
import { GradesScreen } from "./views/profile/Grades";
import { Profile } from "./views/profile/Profile";

import { NoticesScreen } from "./views/Notices";

import { LibraryIndex } from "./views/library";
import { CategoryScreen } from "./views/library/CategoryScreen";

import { GeneralScreen } from "./views/generals";
import { ModulesScreen } from "./views/generals/ModulesScreen";
import { ModuleScreen } from "./views/generals/modules";
import { InfoModule } from "./views/generals/modules/InfoModule";
import { TasksModule } from "./views/generals/modules/TasksModule";
import { ExamModule } from "./views/generals/modules/ExamModule";
import { StudentsScreen } from "./views/generals/StudentsScreen";
import { StudentIndex } from "./views/generals/students";
import { StudentModule } from "./views/generals/students/StudentModule";
import { StudentTasks } from "./views/generals/students/StudentTasks";
import { GradesIndex } from "./views/generals/grades";
import { GradesStudents } from "./views/generals/grades/Students";
import { StudentGrades } from "./views/generals/grades/StudentGrades";
import { GradesConferences } from "./views/generals/grades/Conferences";

import { ModulesStudent } from "./views/modules";
import { ModuleInfoStudent } from "./views/modules/module/InfoStudent";
import { ModuleStudent } from "./views/modules/module";
import { ModuleBibliographyStudent } from "./views/modules/module/BibliographyStudent";
import { ExamIndex } from "./views/modules/module/ExamIndex";
import { ExamScreen } from "./views/modules/module/ExamScreen";
import { StudentModules } from "./views/generals/students/StudentModules";
import { StudentExam } from "./views/generals/students/StudentExam";
import { AdsScreen } from "./views/generals/AdsScreen";

const root = document.getElementById("root")!;

const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Login />} />
          <Route path="home" element={<HomeScreen />} />
          <Route path="notices" element={<NoticesScreen />} />
          <Route path="profile" element={<ProfileIndex />}>
            <Route path="main" element={<Profile />} />
            <Route path="password" element={<Password />} />
            <Route path="grades" element={<GradesScreen />} />
          </Route>
          <Route path="library" element={<LibraryIndex />} />
          <Route path="library/:category" element={<CategoryScreen />} />
          <Route path="generals" element={<GeneralScreen />}>
            <Route path="modules" element={<ModulesScreen />} />
            <Route path="module/:id" element={<ModuleScreen />}>
              <Route path="info" element={<InfoModule />} />
              <Route path="tasks" element={<TasksModule />} />
              <Route path="exam" element={<ExamModule />} />
            </Route>
            <Route path="students" element={<StudentsScreen />} />
            <Route path="student/:id" element={<StudentIndex />}>
              <Route index element={<StudentModules />} />
              <Route path="module/:idModule" element={<StudentModule />}>
                <Route path="exam" element={<StudentExam />} />
                <Route path="tasks" element={<StudentTasks />} />
              </Route>
            </Route>
            <Route path="grades" element={<GradesIndex />}>
              <Route path="conferences" element={<GradesConferences />} />
              <Route path="students" element={<GradesStudents />} />
              <Route path="students/:id" element={<StudentGrades />} />
            </Route>
            <Route path="ads" element={<AdsScreen />} />
          </Route>
          <Route path="modules" element={<ModulesStudent />} />
          <Route path="module/:id" element={<ModuleStudent />}>
            <Route path="info" element={<ModuleInfoStudent />} />
            <Route
              path="bibliography"
              element={<ModuleBibliographyStudent />}
            />
            <Route path="eval" element={<ExamIndex />} />
            <Route path="eval/:idEval" element={<ExamScreen />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
