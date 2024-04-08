import { Input } from "@/components/ui/input";
import Search from "../../assets/icons/search.svg";
import Filter from "../../assets/icons/filter.svg";
import { useEffect, useState } from "react";
import SearchResults from "@/components/SearchResults";
import GridPost from "@/components/GridPost";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import useDebounce from "@/hooks/useDebounce";
import Loader from "@/components/Loader";
import {useInView} from 'react-intersection-observer'

const Explore = () => {
  const [searchText, setSearchtext] = useState("");
  const {ref, inView} = useInView()
  const debouncedValue = useDebounce(searchText, 500);
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const { data: searchPosts, isFetching } = useSearchPosts(debouncedValue);

  useEffect(() => {
    if(inView && !searchText)fetchNextPage();
  }, [inView, searchText])

  if(!posts) {
    return <Loader />
  }

  const showSearchResults = searchText !== "";
  const showPosts =
    !showSearchResults &&
    posts.pages.every((item) => item.documents.length === 0);
  return (
    <div className="flex flex-col flex-1 items-center overflow-scroll py-10 px-5 md:p-14 custom-scrollbar">
      <div className="max-w-3xl flex flex-col items-center w-5/6 gap-6 md:gap-9">
        <h2 className="text-2xl">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-muted">
          <img src={Search} alt="Search" className="bg-muted" />
          <Input
            type="text"
            placeholder="Search"
            value={searchText}
            className="h-12 bg-muted border-none placeholder:text-light-4 focus-visible:ring-0 focus-visible:ring-offset-0 !ring-offset-0"
            onChange={(e) => setSearchtext(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-5/6 mt-16 mb-7">
        <h3 className="text-xl">Popular Posts</h3>
        <div className="flex items-center justify-center gap-2 bg-muted rounded-md px-3 py-1.5 cursor-pointer">
          <p className="">All</p>
          <img src={Filter} alt="" />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-3xl">
        {showSearchResults ? (
          <SearchResults />
        ) : showPosts ? (
          <p className="text-gray-500 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPost key={index} posts={item.documents} />
          ))
        )}
      </div>
      {hasNextPage && !searchText && (
        <div ref={ref} className="mt-10">
          <Loader/>
        </div>
      )}
    </div>
  );
};

export default Explore;
