import { Separator } from "@/components/ui/separator";
import ImageSlideshow from "./SlideRailComponents/ImageSlideShow";
import DoctorRail from "./SlideRailComponents/DoctorRail";
import PatientRail from "./SlideRailComponents/PatientRail";
import GetUpdates from "./SlideRailComponents/GetUpdates";

export default function SlideRail() {
  return (
    <>
      <div className="mt-20">
        <Separator />
        <span className=" mt-5 grid justify-center font-serif text-3xl">
          Get yourself treated at Government&apos;s
          <p className="text-2xl grid justify-center">Best Hospital</p>
        </span>
        <div className="mt-10 flex gap-16">
          <ImageSlideshow />
          <div className="mt-10" >
          <GetUpdates />
          </div>
        </div>
        <Separator className="mt-14" />
        <div className="mt-20">
        <div className="text-3xl font-serif ml-10 underline">
            By Doctors
        </div>
        <div className="mt-16">
          <DoctorRail />
        </div>
        <div className="text-3xl font-serif ml-10 underline mt-10">
            By Patients
        </div>
        <div className="mt-10">
          <PatientRail />
        </div>
        </div>
      </div>
    </>
  );
}
