import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import Landing from "@/components/home/landing";
import Chat from "@/components/home/chat"
import axios from 'axios';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session){
    try {
      await axios.post('http://127.0.0.1:8000/user_email', {
        email: session.user.email
      })
    } catch (err) {
      console.error(err)
    }
  }
  else {
    try {
      await axios.post('http://127.0.0.1:8000/user_email', {
        email: ""
      })
    } catch (err) {
      console.error(err)
    }
  }
  return (
    session !== null ? (
      <>
      <Chat email={session.user.email} />
      </>
    ) : (
      <Landing />
    )
    
  );
}
