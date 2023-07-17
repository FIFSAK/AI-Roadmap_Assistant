"use client";

import useScroll from "@/lib/hooks/use-scroll";
import Image from "next/image";
import Link from "next/link";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";

export default function NavBar({ session }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  return (
    <>
      <SignInModal />
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
            <Link href={`/my_roadmaps?email=${session?.user?.email}`} className="mr-4 text-black hover:underline">
              My Roadmaps
            </Link>
            <Link href="/" className="mr-4 text-black hover:underline">
              Home
            </Link>
            <Link href="/take_a_survey" className="mr-4 text-black hover:underline">
              Take a survey
            </Link>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
