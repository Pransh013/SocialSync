import { Input } from "@/components/ui/input";
import Search from "../../assets/icons/search.svg";
import Filter from "../../assets/icons/filter.svg";
import { useState } from "react";

const Explore = () => {
  const [searchText, setSearchtext] = useState("");
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
      <div className="flex justify-between items-center max-w-3xl mt-16 mb-7">
        <h3 className="text-2xl">Popular Posts</h3>
        <div className="flex items-center justify-center gap-3 bg-muted rounded-xl px-4 py-2 cursor-pointer">
          <p className="">All</p>
          <img src={Filter} alt="" />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Explore;
