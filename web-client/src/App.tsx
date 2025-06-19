import { Outlet } from "react-router";
import { Banner } from "./components/Banner";

const App = () => {
    return (
      <div >
        <Banner />
        <Outlet />
      </div>
    );
};

export default App;
