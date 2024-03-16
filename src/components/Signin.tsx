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
import { signinSchema } from "@/lib/validations/main";
import Logo from "../assets/Logo.png";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/contexts/AuthContext";

const Signin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signinSchema>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        variant: "destructive",
        title: "User not found, please sign up first",
      });
    }

    const isLoggedIn = await checkAuthUser();
    console.log(isLoggedIn);

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "Sign in failed. Please try again",
      });
    }
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
            Sign-in to your account
          </p>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
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
                      className="bg-primary-foreground text-muted font-medium text-lg "
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
                      className="bg-primary-foreground text-muted font-medium text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="text-lg font-semibold mt-3">
              {isUserLoading ? <Loader /> : "Sign in..."}
            </Button>
            <p>
              Don't have an account?
              <Link to={"/signup"} className="underline text-sky-600 ml-2">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default Signin;
