import { useParams } from "react-router";

export const ModuleScreen = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};
