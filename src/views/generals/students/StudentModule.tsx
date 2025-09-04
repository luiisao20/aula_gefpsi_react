import { Outlet } from "react-router";
import { BreadCumbComponentStudent } from "../../../components/BreadCumbComponent";

export const StudentModule = () => {
  return (
    <div>
      <BreadCumbComponentStudent styles="my-6" />
      <Outlet />
    </div>
  );
};
