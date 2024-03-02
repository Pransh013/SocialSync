import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/lib/validations/main";
import Logo from "../assets/Logo.png";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { createUserAccount } from "@/lib/appwrite/api";
import { useToast } from "@/components/ui/use-toast";

const Signup = () => {
  const isLoading = false;
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    const newUser = await createUserAccount(values);
    console.log(newUser);
  }

  return (
    <>
      <Form {...form}>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-5 sm:gap-8">
            <img src={Logo} alt="logo" className="w-10 dark:invert " />
            <p className="text-4xl sm:text-5xl font-semibold sm:font-bold tracking-wide">
              SocialSync
            </p>
          </div>
          <p className="text-center text-2xl font-semibold tracking-wide">
            Create your account
          </p>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold">Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your fullname"
                      {...field}
                      className="bg-primary-foreground text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      {...field}
                      className="bg-primary-foreground text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold">
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className="bg-primary-foreground text-lg "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="bg-primary-foreground text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="text-lg font-semibold mt-3">
              {isLoading ? <Loader /> : "Sign up..."}
            </Button>
            <p>
              Already have an account?
              <Link to={"/signin"} className="underline text-sky-600 ml-2">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default Signup;
