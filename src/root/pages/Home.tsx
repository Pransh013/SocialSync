import Loader from "@/components/Loader";
import PostCard from "@/components/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";

const Home = () => {
  const {
    data: posts,
    isPending: isLoading,
    isError: isError,
  } = useGetRecentPosts();
  return (
    <>
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
          <div className="max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
            <h2 className="text-left w-full text-2xl font-semibold">Home</h2>
            {isLoading && !posts ? (
              <Loader />
            ) : (
              <ul className="flex flex-col flex-1 gap-9 w-full ">
                {posts?.documents.map((post) => (
                  <PostCard key={post.$id} post={post} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
