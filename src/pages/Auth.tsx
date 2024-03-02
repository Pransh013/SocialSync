import { Outlet, useNavigate } from "react-router-dom";
import Login from "../assets/Login.png";

const Auth = () => {
  const isAuthenticated = false;
  const navigate = useNavigate();

  return (
    <>
      {isAuthenticated ? (
        navigate("/")
      ) : (
        <div className="w-full h-screen flex">
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <div className="hidden md:block relative w-1/2 h-screen rounded-md overflow-hidden">
            <div className="absolute w-full h-full z-10 bg-[#00000055]"></div>
            <img
              src={Login}
              alt="Login_image"
              className=" h-full w-full object-cover bg-no-repeat"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
