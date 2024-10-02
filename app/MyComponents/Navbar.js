"use client";
import Link from "next/link";
// import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
// import { X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faMagnifyingGlass,
  faRightToBracket,
  faTruckMedical,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
}, []);

const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);

};
  return (
    <>
      <div className="bg-[#c9fefe]/65 sticky top-0 h-12 mt-5 font-sans backdrop-blur-md z-20">
        <div className="flex h-12 items-center justify-between mr-5">
          <div className="flex ml-4 text-xl font-bold items-center">
            <Link href="/">
              <img
                src="/logo.svg"
                alt="Logo"
                width={200}
                height={50}
                className="your-custom-class"
              />
            </Link>
          </div>
          <div className="ml-auto items-center p-5 gap-10 text-1xl hidden lg:flex">
            <div>
              <p className="hover:text-blue-500">
                {isLoggedIn ? (
                  <Link href="/logIn" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faRightToBracket} /> Log Out
                </Link>
                ) : (
                  <Link href="/logIn">
                    <FontAwesomeIcon icon={faRightToBracket} /> Log In
                  </Link>
                )}
              </p>
            </div>
            <div>
              <p className="hover:text-blue-500">
                <Link href="/appointment">
                  <FontAwesomeIcon icon={faCalendarCheck} /> Appointment
                </Link>
              </p>
            </div>
            <div>
              <p className="hover:text-blue-500">
                <Link href="/profile">
                  <FontAwesomeIcon icon={faUser} /> Profile
                </Link>
              </p>
            </div>
            <div>
              <p className="hover:text-blue-500">
                <Link href="/emergency">
                  <FontAwesomeIcon icon={faTruckMedical} /> Emergency
                </Link>
              </p>
            </div>
            <div className="flex">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                className="rounded-2xl"
                type="text"
                placeholder="  Search..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu
      {state && (
        <div className="lg:hidden bg-[#c9fefe]/40 shadow-lg transform transition-transform duration-300 hover:translate-y-1 hover:shadow-2xl drop-shadow-xl font-serif backdrop-blur-md mx-20 sticky top-16 z-20">
          <div className="space-y-5">
            <div className="border-b border-solid border-black flex justify-center py-3">
              <p className="hover:text-blue-500">
                <Link href="/accounts">Accounts</Link>
              </p>
            </div>
            <div className="border-b border-solid border-black flex justify-center py-3">
              <p className="hover:text-blue-500">
                <Link href="/appointment">Appointment</Link>
              </p>
            </div>
            <div className="border-b border-solid border-black flex justify-center py-3">
              <p className="hover:text-blue-500">
                <Link href="/profile">Profile</Link>
              </p>
            </div>
            <div className="border-b border-solid border-black flex justify-center py-3">
              <p className="hover:text-blue-500">
                <Link href="/inventory">Inventory</Link>
              </p>
            </div>
            <div className="border-b border-solid border-black flex item-center justify-center py-3">
              <input
                className="rounded-2xl"
                type="text"
                placeholder="  Search..."
              />
            </div>
          </div>
        </div> */}
      {/* )} */}
    </>
  );
}
