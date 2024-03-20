import { multiFormatDateString } from "@/lib/utils";
import { PostCardProps } from "@/types";
import { Link } from "react-router-dom";
import Edit from "../assets/icons/edit.svg";
import { useUserContext } from "@/contexts/AuthContext";

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return;
  return (
    <div className="rounded-3xl border border-gray-800 p-5 lg:p-7 w-full max-w-screen-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={post?.creator?.imageUrl}
              alt="creator"
              className="rounded-full w-12"
            />
          </Link>
          <div className="fle flex-col">
            <p className="text-[16px] font-medium leading-[140%] text-white">
              {post.creator.name}
            </p>
            <div className="flex justify-center items-center gap-2">
              <p className="text-[12px] font-semibold leading-[140%]">
                {multiFormatDateString(post.$createdAt)}
              </p>
              -
              <p className="text-[12px] font-semibold leading-[140%]">
                {post.location}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id ? "hidded" : "flex"}`}
        >
          <img src={Edit} alt="" className="w-10" />
        </Link>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <div className="py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
