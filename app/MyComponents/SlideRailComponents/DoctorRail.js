import Marquee from "react-fast-marquee";
import DoctorsCard from "./DoctorsCard";

export default function DoctorRail() {
  return (
    <>
  
      <Marquee direction="right" speed={100} pauseOnHover>
        <div className="border-2 border-gray-600 w-96 mx-7 rounded-xl" >
          <DoctorsCard
            image="/testimage.png"
            name="Anadi Chauhan, "
            specialization="Dermatologist"
            description="To create a color-changing text effect that changes over time using
            Tailwind CSS, you can utilize the"
          />
        </div>
        <div className="border-2 border-gray-600 w-96 mx-7 rounded-xl">
          <DoctorsCard
            image="/testimage.png"
            name="Anadi Chauhan, "
            specialization="Dermatologist"
            description="To create a color-changing text effect that changes over time using
            Tailwind CSS, you can utilize the"
          />
        </div>
        <div className="border-2 border-gray-600 w-96 mx-7 rounded-xl">
          <DoctorsCard
            image="/testimage.png"
            name="Anadi Chauhan, "
            specialization="Dermatologist"
            description="To create a color-changing text effect that changes over time using
            Tailwind CSS, you can utilize the"
          />
        </div>
        <div className="border-2 border-gray-600 w-96 mx-7 rounded-xl">
          <DoctorsCard
            image="/testimage.png"
            name="Anadi Chauhan, "
            specialization="Dermatologist"
            description="To create a color-changing text effect that changes over time using
            Tailwind CSS, you can utilize the"
          />
        </div>
        <div className="border-2 border-gray-600 w-96 mx-7 rounded-xl">
          <DoctorsCard
            image="/testimage.png"
            name="Anadi Chauhan, "
            specialization="Dermatologist"
            description="To create a color-changing text effect that changes over time using
            Tailwind CSS, you can utilize the"
          />
        </div>
        <div className="border-2 border-gray-600 w-96 mx-7 rounded-xl">
          <DoctorsCard
            image="/testimage.png"
            name="Anadi Chauhan, "
            specialization="Dermatologist"
            description="To create a color-changing text effect that changes over time using
            Tailwind CSS, you can utilize the"
          />
        </div>
      </Marquee>
    </>
  );
}
