import { bottombarLinks } from "@/constants";
import { Navlinks } from "@/types";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Bottombar = () => {
  const location = useLocation();
  return (
    <div className="flex sticky bottom-0 bg-primary sm:hidden z-50 w-full justify-around px-5 py-2">
      {bottombarLinks.map((item: Navlinks) => {
        const isActive = location.pathname === item.route;
        return (
          <div key={item.label}>
            <NavLink to={item.route}>
              <Button
                variant={"default"}
                className={`group w-12 h-12 flex flex-col gap-0.5 ${
                  isActive
                    ? "bg-primary-foreground hover:bg-primary-foreground"
                    : "hover:bg-primary-foreground"
                } text-primary justify-start items-center`}
              >
                <img
                  src={item.imgURL}
                  alt=""
                  className={`w-5 ${
                    isActive
                      ? "hue-rotate-[95deg] group-hover:hue-rotate-[95deg]"
                      : "brightness-200 group-hover:hue-rotate-[95deg] group-hover:brightness-90"
                  }`}
                />
                <p
                  className={`text-[11px] ${
                    isActive
                      ? "text-primary group-hover:text-primary"
                      : "text-white group-hover:text-primary"
                  }`}
                >
                  {item.label}
                </p>
              </Button>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}

export default Bottombar