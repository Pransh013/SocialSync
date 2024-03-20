import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { Input } from "./ui/input";
import { postSchema } from "@/lib/validations/main";
import { PostProps } from "@/types";
import { useCreatePost } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/contexts/AuthContext";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";

const PostForm = ({ post }: PostProps) => {
  const { mutateAsync: createPost } = useCreatePost();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      caption: post ? post.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(", ") : "",
    },
  });

  async function onSubmit(values: z.infer<typeof postSchema>) {
    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({
        variant: "destructive",
        title: "Please try again.",
      });
      return;
    }

    toast({
      variant: "default",
      title: "Post created successfully",
      className: "bg-primary",
    });
    navigate("/");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-3xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-muted dark:bg-popover h-36 rounded-md border-none focus-visible:ring-1 custom-scrollbar"
                  placeholder="Add a caption..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Location</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="bg-muted dark:bg-popover h-10 border-none focus-visible:ring-1 placeholder:text-xs"
                  placeholder="Add a location..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add tags</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="bg-muted dark:bg-popover h-10 border-none focus-visible:ring-1 
                  placeholder:text-xs"
                  placeholder="ReactJS, TypeScript, Appwrite"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center gap-8">
          <Button
            className="bg-muted text-secondary-foreground dark:bg-popover text-lg dark:hover:bg-muted hover:bg-[#b9b6b6]"
            type="button"
          >
            Cancel
          </Button>
          <Button className="text-lg" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
