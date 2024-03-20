import { Models } from "appwrite";

export type NewUser = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type SignInUser = {
  email: string;
  password: string;
};

export type ContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type Navlinks = {
  imgURL: string;
  route: string;
  label: string;
};

export type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

export type PostProps = {
  post?: Models.Document;
};

export type NewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type PostCardProps = {
  post: Models.Document;
}