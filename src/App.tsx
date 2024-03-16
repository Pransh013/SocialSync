import { Route, Routes } from "react-router-dom";
import Home from "./root/pages/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Auth from "./root/pages/Auth";
import RootLayout from "./root/RootLayout";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<Auth />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
