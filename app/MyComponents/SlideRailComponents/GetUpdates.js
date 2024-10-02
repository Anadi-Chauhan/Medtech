"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.number().min(10, "must be 10 digits"),
});

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
  });


  const onSubmit = (data) => {
    console.log(data);
    toast.success("Form submitted successfully!");
  };

  return (
      <div className="w-full max-w-lg bg-white rounded-lg p-6 border-2 border-gray-300 shadow-md drop-shadow-xl">
        <div className=" font-sans font-semibold text-2xl p-5" >
        <p className="ml-14">Join Us</p>
        <p>Get Latest Updates</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-5">
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Number*/}
          <div className="grid gap-2">
            <Label htmlFor="mobile">Phone No.</Label>
            <Input
              id="mobile"
              type="number"
              placeholder="Enter your phone number"
              {...register("mobile")}
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className=" rounded-xl w-1/3 ml-36">
            Submit
          </Button>
        </form>
      </div>
  );
};

export default Page;
