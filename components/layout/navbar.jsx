"use client";

import { useEffect, useState } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Image from "next/image";
import Link from "next/link";
import { useSignInModal } from "./sign-in-modal";
import { useLoginModal } from "./login-modal";
import axios from 'axios';

export default function NavBar() {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const { LoginModal, setShowLoginModal } = useLoginModal();
  const scrolled = useScroll(50);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsUserLoggedIn(Boolean(localStorage.getItem('jwt')));
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem('jwt');
      localStorage.removeItem('chatMessages');
      window.location.reload();
    }
  };

  return (
    <>
      <SignInModal />
      <LoginModal />
      <div
        className={`fixed top-0 w-full ${scrolled
          ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
          : "bg-white/0"
          } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/Smile-logo-template-on-transparent-background-PNG.png"
              alt="smile"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Road map Assistant</p>
          </Link>
          <div className="relative">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="sm:hidden">
              <Image src="/hamburger.png" alt="Menu" width="30" height="30" />
            </button>
            <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10 ${isMenuOpen ? '' : 'hidden'} sm:hidden`}>
              {isUserLoggedIn && (
                <>
                  <Link href="/majors" className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                    List of Majors
                  </Link>
                  <Link href="/my_roadmaps" className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                    My Roadmaps
                  </Link>
                  <Link href="/" className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                    Home
                  </Link>
                  <Link href="/take_a_survey" className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                    Take a survey
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </>
              )}

              {!isUserLoggedIn && (
                <>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-200"
                    onClick={() => setShowSignInModal(true)}
                  >
                    Sign Up
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-200"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Log In
                  </button>
                </>
              )}
            </div>
          </div>
          <div className={`hidden sm:flex items-center space-x-4`}>
            {isUserLoggedIn && (
              <>
                <Link href="/majors" className="text-black hover:underline">
                  List of Majors
                </Link>
                <Link href="/my_roadmaps" className="text-black hover:underline">
                  My Roadmaps
                </Link>
                <Link href="/" className="text-black hover:underline">
                  Home
                </Link>
                <Link href="/take_a_survey" className="text-black hover:underline">
                  Take a survey
                </Link>
                <button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </>
            )}

            {!isUserLoggedIn && (
              <>
                <button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                >
                  Sign Up
                </button>
                <button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowLoginModal(true)}
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
