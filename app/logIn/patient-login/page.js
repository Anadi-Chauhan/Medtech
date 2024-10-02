"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCredentialsValidator } from "@/app/MyComponents/AuthCredentialsValidator";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from 'react-toastify';

const PatientsLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const router = useRouter();

  const onSubmit = async ({ registrationID, mobile }) => {
    console.log("Form Submitted:", { registrationID, mobile });
  
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationID, mobile }),
      });
  
      if (response.status === 401) {
        toast.error('Invalid credentials');
        return;
      }
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.log(errorResponse);
        toast.error(errorResponse.message || 'Something went wrong, please try again later.');
      }
  
      const { user } = await response.json();
      localStorage.setItem('isLoggedIn', 'true'); 
      router.push('/profile/patient-profile');
      toast.success(`Welcome back, ${user.mobile}!`);
      // Redirect the user or set their session here
    } catch (error) {
      toast.error(error.message);
    }
    
  };

  return (
    <>
      <div className="container relative flex pt-3 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center text-center space-y-2">
            <Image src="/logo.svg" width={300} height={300} alt="404" />
            <h1 className="text-2xl font-bold">Log In to your Patient Account</h1>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}> {/* Form submit handler */}
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="registrationID">Registration No.</Label>
                  <Input
                    {...register("registrationID")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.registrationID,
                    })}
                    placeholder="Enter Your Registration registrationID"
                  />
                  {errors?.registrationID && (
                    <p className="text-sm text-red-500">{errors.registrationID?.message}</p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="mobile">Phone No.</Label>
                  <Input
                    {...register("mobile")}
                    type="tel"
                    className={cn({
                      "focus-visible:ring-red-500": errors.mobile,
                    })}
                    placeholder="Enter your Phone registrationID"
                  />
                  {errors?.mobile && (
                    <p className="text-sm text-red-500">{errors.mobile?.message}</p>
                  )}
                </div>
                <Button type="submit">Log In</Button> {/* Button should have type="submit" */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientsLogin;
