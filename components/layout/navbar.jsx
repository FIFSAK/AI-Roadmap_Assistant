"use client";

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

  const isUserLoggedIn = Boolean(localStorage.getItem('jwt'));

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    axios.defaults.headers.common['Authorization'] = null;
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
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Road map Assistant</p>
          </Link>
          <div className="flex items-center">
            <Link href="/majors" className="mr-4 text-black hover:underline">
              List of Majors
            </Link>
            <Link href="/my_roadmaps" className="mr-4 text-black hover:underline">
              My Roadmaps
            </Link>
            <Link href="/" className="mr-4 text-black hover:underline">
              Home
            </Link>
            <Link href="/take_a_survey" className="mr-4 text-black hover:underline">
              Take a survey
            </Link>
            {isUserLoggedIn ? (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={handleLogout}
              >
                Log Out
              </button>
            ) : (
              <>
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
                // Rest of your button props
              >
                Sign Up
              </button>
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowLoginModal(true)}
                // Rest of your button props
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
