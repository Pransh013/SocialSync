import { useUserContext } from "@/contexts/AuthContext";
import { GridPostsProps } from "@/types";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import PostStats from "./PostStats";

const GridPost = ({
  posts,
  showStats = true,
  showUser = true,
}: GridPostsProps) => {
  const { user } = useUserContext();
  return (
    <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-3xl;">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link
            to={`/posts/${post.$id}`}
            className="flex rounded-[24px] border overflow-hidden cursor-pointer w-full h-full"
          >
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>
          <div className="absolute bottom-0 p-5 flex items-center justify-between w-full bg-gradient-to-t from-gray-600 to-transparent rounded-b-[24px] gap-2">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <UserAvatar
                  fallback={post?.creator?.name}
                  imageUrl={post?.creator?.imageUrl}
                  area={"w-12 h-12 filter invert"}
                />
                <p className="text-nowrap text-sm font-semibold">
                  {post?.creator?.name}
                </p>
              </div>
            )}

            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPost;
