"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DoctorsLogin from "./doctor-login/page";
import PatientsLogin from "./patient-login/page";
import Image from "next/image";

const Page = () => {
  const [isLogin, setIsLogin] = useState(true);

  const formVariants = {
    hidden: { opacity: 0, y: isLogin ? -30 : 30 }, // Fade from up if login, down if signup
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: isLogin ? 30 : -30 }, // Reverse direction
  };

  return (
    <>
      <div className="min-h-screen flex gap-20">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full mt-16 max-w-md ml-24 border-2 border-gray-200">
          <p className=" ml-[4.5rem] font-sans font-semibold text-2xl" >Log In to your Account</p>
          {/* Card Header with Buttons */}
          <div className="flex justify-between items-center mb-6 mt-6">
            <button
              className={`text-xl font-semibold transition-colors duration-300 ${isLogin ? 'text-blue-600' : 'text-gray-500'}`}
              onClick={() => setIsLogin(true)}
            >
              As Patient
            </button>
            <button
              className={`text-xl font-semibold transition-colors duration-300 ${!isLogin ? 'text-blue-600' : 'text-gray-500'}`}
              onClick={() => setIsLogin(false)}
            >
              As CHO/Doctor
            </button>
          </div>

          <div className=" rounded-xl border-2 border-gray-200">
            {isLogin !== null && (
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={formVariants}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                  {isLogin ? <PatientsLogin /> : <DoctorsLogin />}
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <div className="mt-40 h-1/2 w-1/2 shadow-sm  " >
          <Image src="/LoginPage.png" height={500} width={500} alt="404" layout="responsive" />
        </div>
      </div>
    </>
  );
};

export default Page;
