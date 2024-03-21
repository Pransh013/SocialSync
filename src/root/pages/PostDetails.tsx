import Loader from "@/components/Loader";
import UserAvatar from "@/components/UserAvatar";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";
import Edit from "../../assets/icons/edit.svg";
import Delete from "../../assets/icons/delete.svg";
import { useUserContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import PostStats from "@/components/PostStats";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id!);
  const { user } = useUserContext();
  return (
    <div className="flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar items-center">
      {isPending ? (
        <Loader />
      ) : (
        <div className=" w-full max-w-3xl rounded-[30px] flex-col flex xl:flex-row border xl:rounded-l-[24px]">
          <img
            src={post?.imageUrl}
            className="h-80 lg:h-[480px] xl:w-[48%] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none object-cover p-5"
          />
          <div className="flex flex-col gap-5 lg:gap-7 flex-1 items-start p-8 rounded-[30px]">
            <div className="flex justify-between items-center w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <UserAvatar
                  fallback={post?.creator?.name}
                  imageUrl={post?.creator?.imageUrl}
                  area={"w-14 h-14 filter invert"}
                />
                <div className="fle flex-col">
                  <p className="text-[19px] font-semibold leading-[140%] tracking-wide text-white">
                    {post?.creator.name}
                  </p>
                  <div className="flex justify-center items-center gap-2">
                    <p className="text-[13px] text-gray-500 font-semibold leading-[140%]">
                      {multiFormatDateString(post?.$createdAt)},
                    </p>
                    <p className="text-[13px] font-semibold text-gray-500 leading-[140%]">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex justify-center items-center gap-4">
                <Link to={`/update-post/${post?.$id}`}>
                  <img
                    src={Edit}
                    alt=""
                    className={`${
                      user.id !== post?.creator.$id ? "hidden" : "flex"
                    } w-7 md:w-9 filter hue-rotate-90`}
                  />
                </Link>
                <Button
                  variant={"ghost"}
                  className={`p-0 flex gap-3 hover:bg-transparent ${
                    user.id === post?.creator.$id ? "flex" : "hidden"
                  }`}
                >
                  <img
                    src={Delete}
                    className="w-8 md:w-10 filter hue-rotate-[-16deg]"
                    alt="delete"
                    // onClick={handleDelete}
                  />
                </Button>
              </div>
            </div>
            <hr className="border w-full " />
            <div className="py-5 flex flex-col flex-1 w-full">
              <p className="font-semibold text-[18px] text-gray-100">
                {post?.caption}
              </p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li
                    className="text-[13px] text-gray-400 font-medium"
                    key={tag}
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post!} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
