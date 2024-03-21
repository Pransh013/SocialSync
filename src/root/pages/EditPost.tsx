import PostForm from "@/components/PostForm";
import AddPost from "../../assets/icons/addpost.svg";
import { useParams } from "react-router-dom";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/Loader";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending: isPostLoading } = useGetPostById(id!);

  if (isPostLoading) return <Loader />;
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className="max-w-3xl flex gap-4 items-center justify-start w-full">
          <img
            src={AddPost}
            alt=""
            className="w-10 brightness-0 dark:brightness-200"
          />
          <h2 className="w-full text-left text-2xl font-bold leading-[160%]">
            Edit Post
          </h2>
        </div>
        <PostForm action = "Update" post={post}/>
      </div>
    </div>
  );
};

export default EditPost;
