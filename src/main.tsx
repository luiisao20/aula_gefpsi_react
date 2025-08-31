import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import Login from "./views/Login";
import { HomeScreen } from "./views/Home";
import { ProfileIndex } from "./views/profile";
import { Password } from "./views/profile/Password";
import { Payments } from "./views/profile/Payments";
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
            <Route path="payments" element={<Payments />} />
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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
