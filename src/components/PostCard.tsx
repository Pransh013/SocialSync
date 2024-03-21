import { multiFormatDateString } from "@/lib/utils";
import { PostCardProps } from "@/types";
import { Link } from "react-router-dom";
import Edit from "../assets/icons/edit.svg";
import { useUserContext } from "@/contexts/AuthContext";
import UserAvatar from "./UserAvatar";
import PostStats from "./PostStats";

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return;
  return (
    <div className="rounded-3xl border border-gray-700 p-5 lg:p-7 w-full max-w-screen-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <UserAvatar
              fallback={post?.creator?.name}
              imageUrl={post?.creator?.imageUrl}
              area={"w-14 h-14 filter invert"}
            />
          </Link>
          <div className="fle flex-col">
            <p className="text-[19px] font-semibold leading-[140%] tracking-wide text-white">
              {post.creator.name}
            </p>
            <div className="flex justify-center items-center gap-2">
              <p className="text-[13px] text-gray-500 font-semibold leading-[140%]">
                {multiFormatDateString(post.$createdAt)},
              </p>
              <p className="text-[13px] font-semibold text-gray-500 leading-[140%]">
                {post.location}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id ? "hidded" : "flex"}`}
        >
          <img src={Edit} alt="" className="w-8 filter hue-rotate-[95deg]" />
        </Link>
      </div>
      <Link to={`/posts/${post?.$id}`}>
        <div className="py-5">
          <p className="font-semibold text-[18px] text-gray-100">
            {post?.caption}
          </p>
          <ul className="flex gap-1 mt-2">
            {post?.tags.map((tag: string) => (
              <li className="text-[13px] text-gray-400 font-medium" key={tag}>
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img src={post?.imageUrl} className="w-5/6 mx-auto" alt="" />
      </Link>
      <PostStats post={post} userId={user.id}/>
    </div>
  );
};

export default PostCard;
