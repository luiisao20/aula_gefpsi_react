import { Outlet, useMatch } from "react-router";

import "./assets/main.css";
import { Navbar } from "./components/Navbar";

const App = () => {
  const match = useMatch('/');

  return (
    <div>
      {!match && <Navbar />}
      <Outlet />
    </div>
  );
};

export default App;
