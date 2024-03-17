import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function UserAvatar({
  fallback,
  imageUrl,
  area,
}: {
  fallback: string;
  imageUrl: string;
  area: string;
}) {
  const nameArr = fallback?.split(" ");
  let initials = nameArr[0]?.charAt(0) + nameArr[1]?.charAt(0);
  if (imageUrl.includes("appwrite")) imageUrl = "";
  if (!initials) initials = "U";
  return (
    <Avatar className={` ${area}`}>
      <AvatarImage src={imageUrl} alt="user" />
      <AvatarFallback className="bg-muted text-primary dark:text-white font-semibold">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
