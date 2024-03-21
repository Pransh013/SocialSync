import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import Like from "../assets/icons/like.svg";
import Liked from "../assets/icons/liked.svg";
import Save from "../assets/icons/save.svg";
import Saved from "../assets/icons/saved.svg";
import { PostStatsProps } from "@/types";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { checkIsLiked } from "@/lib/utils";
import Loader from "./Loader";

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList: string[] = post.likes.map(
    (user: Models.Document) => user.$id
  );

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSaving } = useSavePost();
  const { mutate: deleteSavePost, isPending: isDeleting } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostData = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostData);
  }, [currentUser]);

  const handleLikes = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSaves = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostData) {
      setIsSaved(false);
      return deleteSavePost(savedPostData.$id);
    }
      savePost({ postId: post.$id, userId });
      setIsSaved(true);
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={checkIsLiked(likes, userId) ? Liked : Like}
          alt=""
          className="w-10 cursor-pointer"
          onClick={handleLikes}
        />
        <p className="">{likes.length}</p>
      </div>
      <div className="flex gap-2 mr-5">
        {isSaving || isDeleting ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? Saved : Save}
            alt=""
            className="w-10 cursor-pointer"
            onClick={handleSaves}
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
