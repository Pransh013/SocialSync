import PostForm from "@/components/PostForm";
import AddPost from "../../assets/icons/addpost.svg";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className="max-w-3xl flex gap-4 items-center justify-start w-full">
          <img src={AddPost} alt="" className="w-10" />
          <h2 className="w-full text-left text-2xl font-bold leading-[160%]">
            Create Post
          </h2>
        </div>
        <PostForm/>
      </div>
    </div>
  );
};

export default CreatePost;
