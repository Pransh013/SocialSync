import { LogOut } from "lucide-react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "@/contexts/AuthContext";
import UserAvatar from "./UserAvatar";
import { sidebarLinks } from "@/constants";
import { Navlinks } from "@/types";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserContext();
  const { mutate: handleSignout, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) {
      navigate("/signin");
    }
  }, [isSuccess]);
  return (
    <div className="w-1/4 min-w-60 bg-primary hidden sm:flex py-14">
      <div className="flex flex-col gap-12 w-9/10 mx-auto">
        <Link to={"/"}>
          <Logo width={"w-9"} text={"text-2xl"} />
        </Link>
        <Link to={`/profile/${user.id}`}>
          <div className="flex items-center gap-4">
            <UserAvatar
              area={"w-12 h-12"}
              fallback={user.name}
              imageUrl={user.imageUrl}
            />
            <div>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-[#ffffffb6]">@{user.username}</p>
            </div>
          </div>
        </Link>
        <div className="flex flex-col gap-4">
          {sidebarLinks.map((item: Navlinks) => {
            const isActive = location.pathname === item.route;
            return (
              <div key={item.label}>
                <NavLink to={item.route}>
                  <Button
                    variant={"default"}
                    className={`group w-40 h-10 flex gap-4 ${
                      isActive
                        ? "bg-primary-foreground hover:bg-primary-foreground"
                        : "hover:bg-primary-foreground"
                    } text-primary justify-start items-center transition-all duration-300 ease-in`}
                  >
                    <img
                      src={item.imgURL}
                      alt=""
                      className={` ${
                        isActive
                          ? "hue-rotate-[95deg] group-hover:hue-rotate-[95deg]"
                          : "brightness-200 group-hover:hue-rotate-[95deg] group-hover:brightness-90"
                      } transition-all duration-300 ease-in`}
                    />
                    <p
                      className={`text-[16px] ${
                        isActive
                          ? "text-primary group-hover:text-primary"
                          : "text-white group-hover:text-primary"
                      } transition-all duration-300 ease-in`}
                    >
                      {item.label}
                    </p>
                  </Button>
                </NavLink>
              </div>
            );
          })}
        </div>
        <Button
          variant={"ghost"}
          className="flex mt-16 justify-start w-28 items-center gap-2 transition-all duration-500 ease-in"
          onClick={() => handleSignout()}
        >
          <p className="font-bold hidden sm:flex">Logout</p>
          <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default LeftSidebar;
