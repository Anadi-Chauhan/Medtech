"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCredentialsValidator } from "@/app/MyComponents/AuthCredentialsValidator";
import { toast } from 'sonner';
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const DoctorsLogin= () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const origin = searchParams.get('origin');

  const continueAsAdmin = () => {
    router.push("/admin");
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        toast.error("Invalid email or password");
        return;
      }

      if (!response.ok) {
        throw new Error("Something went wrong, please try again later.");
      }

      toast.success("Signed in successfully");
      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      router.push('/');
    } catch (error) {
      toast.error(error.message || 'Error signing in.');
    }
  };

  return (
    <>
      <div className="container relative flex pt-3 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center text-center space-y-2">
            <Image src="/logo.svg" alt="404" height={300} width={300} />
            <h1 className="text-2xl font-bold">
              Sign In to your Doctor&apos;s account
            </h1>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">{errors.email?.message}</p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">{errors.password?.message}</p>
                  )}
                </div>
                <Button>Log In</Button>
              </div>
            </form>
            <div className="relative">
              <div className="aria-hidden: absolute inset-0 flex items-center">
                <span className="w-4 border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">OR</span>
              </div>
            </div>
            <Button onClick={continueAsAdmin} variant="secondary">
              Continue as Admin
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorsLogin;
