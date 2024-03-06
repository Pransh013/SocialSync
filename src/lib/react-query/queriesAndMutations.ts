import { NewUser, SignInUser } from "@/types";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createUserAccount, signInAccount } from "../appwrite/api";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: NewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: SignInUser) => signInAccount(user),
  });
};