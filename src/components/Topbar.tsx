import { LogOut } from "lucide-react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "@/contexts/AuthContext";
import UserAvatar from "./UserAvatar";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: handleSignout, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) {
      navigate("/signin");
    }
  }, [isSuccess]);

  return (
    <div className="w-full bg-primary sm:hidden px-5 py-4 flex justify-between">
      <Link to={"/"}>
        <Logo width={"w-9"} text={"text-2xl"} />
      </Link>
      <div className="flex gap-2">
        <Link to={`/profile/${user.id}`}>
          <UserAvatar area={"w-10 h-10"} fallback={user.name} imageUrl={user.imageUrl} />
        </Link>
        <Button
          variant={"ghost"}
          className="flex px-3 items-center"
          onClick={() => handleSignout()}
        >
          <p className="font-bold hidden sm:flex">Logout</p>
          <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
