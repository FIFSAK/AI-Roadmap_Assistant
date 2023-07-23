"use client";

import { useState, useEffect } from 'react';
import Landing from "@/components/home/landing";
import Chat from "@/components/home/chat";

function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      setIsLoggedIn(true);
    }
  }, []);

  return isLoggedIn;
}

export default function HomeClientComponent() {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? <Chat /> : <Landing />;

}
