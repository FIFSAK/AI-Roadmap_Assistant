import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import Landing from "@/components/home/landing";
import Chat from "@/components/home/chat"

export default async function Home() {
  const session = await getServerSession(authOptions);
  // if (session){
  //   try {
  //     await axios.post('http://127.0.0.1:8000/save_email', { email: session.user.email })
  //   } catch (error) {
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //       // http.ClientRequest in node.js
  //       console.log(error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.log('Error', error.message);
  //     }
  //     console.log(error.config);
  //   }
    
  // }
  

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
