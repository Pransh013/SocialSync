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
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSaving } = useSavePost();
  const { mutate: deleteSavePost, isPending: isDeleting } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikes = (e: React.MouseEvent) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((id) => id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSaves = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  return (
    <div className="flex justify-between items-center z-20 px-10 my-4">
      <div className="flex gap-2 items-center">
        <img
          src={checkIsLiked(likes, userId) ? Liked : Like}
          alt=""
          className="w-8 filter hue-rotate-[95deg] cursor-pointer"
          onClick={handleLikes}
        />
        <p className="text-2xl">{likes.length}</p>
      </div>
      <div className="flex gap-2 mr-5">
        {isSaving || isDeleting ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? Saved : Save}
            alt=""
            className="w-8 filter hue-rotate-[95deg] cursor-pointer m-1"
            onClick={handleSaves}
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
