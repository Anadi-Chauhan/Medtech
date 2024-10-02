import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export default function DoctorsCard({
  image,
  name,
  specialization,
  description,
}) {
  return (
    <>
        <div className=" flex justify-center">
          <Avatar>
            <AvatarImage className="h-10 w-10" src={image} />
          </Avatar>
          <span className="mt-2">
            {name}
            {specialization}
          </span>
        </div>
        <div className="ml-2">
          <p>{description}</p>
        </div>
    </>
  );
}
