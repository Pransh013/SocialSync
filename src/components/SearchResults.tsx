import { SearchResultProps } from '@/types';
import Loader from './Loader';
import GridPost from './GridPost';

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultProps) => {

  if(isSearchFetching) return <Loader/>
  if (searchedPosts && searchedPosts.documents.length > 0)
    return <GridPost posts={searchedPosts.documents} />;
  return <div className='text-gray-500 mt-10 text-center w-full'>No results found</div>;
};

export default SearchResults