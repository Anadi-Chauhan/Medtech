import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ModelViewer from "./HomeComponents/3d";
import About from "./HomeComponents/About";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <>
      <div className="flex">
        <div className="flex-grow grid grid-cols-1 mt-20 lg:grid-cols-2">
          <div className="grid justify-center">
            <div className="ml-20">
              <span className="animate-colorChange font-sans font-bold text-5xl">
                Your Health <p className="mt-5">Our Digital Care</p>
              </span>
              <span>
                Create a multilingual AI-driven symptom checker that
                understands multiple Indian languages. This will help patients
                from diverse regions self-diagnose minor health issues and
                suggest nearby specialists, saving time and helping with early
                detection.
              </span>
            </div>
            <div className="mt-10 ml-20 flex gap-12">
              <Link href="/appointment">
                <Button className="transform transition-transform duration-300 hover:translate-y-1">
                  Schedule an appointment
                  <ArrowRight className="transform hover:translate-x-2" />
                </Button>
              </Link>
              <Link href="emergency">
                <Button className="transform transition-transform duration-300 hover:translate-y-1">
                  Emergency
                  <ArrowRight className="transform hover:translate-x-2" />
                </Button>
              </Link>
            </div>
          </div>
          <ModelViewer />
        </div>
      </div>
      <Separator className="mt-20" />
      <div className="mt-10 w-5/6 ml-28" >
        <About />
      </div>
    </>
  );
}
